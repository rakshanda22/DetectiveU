from __future__ import unicode_literals
import youtube_dl
import argparse
import io
import os
import sys
from flask import Flask, render_template, request, redirect, Response,send_from_directory,jsonify
import random, json
from flask_cors import CORS
from socket import *
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 

sock=socket()
sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins":"*"}})

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin","*")
    response.headers.add("Access-Control-Allow-Credentials","false")
    #response.headers.add("Access-Control-Allow-Methods","POST")
    response.headers.add("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Authorization,Accept")
    #response.headers.add('Access-Control-Allow-Origin','*')
    #response.headers.add('Access-Control-Allow-Headers','Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS')
    return response

class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)

name=""
def my_hook(d1):
    if d1['status'] == 'finished':
        my_hook.name=d1['filename']
        print('Done downloading, now converting ...',my_hook.name)

@app.route('/',methods=['POST','GET'])
def transcribe(): 
    link1 = request.form['link']
    print("function1")
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([link1])

    from pydub import AudioSegment
    import glob
    
    newest = max(glob.iglob('*.[Mm][Pp]3'), key=os.path.getctime)
    sound = AudioSegment.from_mp3(newest)
    sound = sound.set_channels(1)
    sound.export("foo.wav", format="wav")

    """Transcribe the given audio file synchronously and output the word time
    offsets."""
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types
    client = speech.SpeechClient()
    transcribe.d=dict()
    with io.open('foo.wav', 'rb') as audio_file:
        content = audio_file.read()

    # Imports the Google Cloud client library
    from google.cloud import storage
    # Instantiates a client
    storage_client = storage.Client()
    # The name for the new bucket
    bucket_name = 'sbhack'
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob("foo.wav")
    blob.upload_from_filename("foo.wav")
    print('File {} uploaded to {}.'.format(
        "foo.wav",
        "sbhack"))
    
    audio = types.RecognitionAudio(uri="gs://sbhack/foo.wav")
    config = types.RecognitionConfig(
        language_code='en-US',
        enable_word_time_offsets=True)
    operation = client.long_running_recognize(config, audio)
    print('Waiting for operation to complete...')
    
    response = operation.result()#timeout=90)
    print(response)
    #word_list=set()

    for result in response.results:
        alternative=result.alternatives[0]
        # The first alternative is the most likely one for this portion.
        print(u'Transcript: {}'.format(result.alternatives[0].transcript))
        for word_info in result.alternatives[0].words:
            word = word_info.word
            start_time = word_info.start_time
            end_time = word_info.end_time
            #print(word)
            word=word.lower()
            print('Word: {}, start_time: {}, end_time: {}'.format(
                word,
                start_time.seconds + start_time.nanos * 1e-9,
                end_time.seconds + end_time.nanos * 1e-9))
            if word not in transcribe.d:
                transcribe.d[word]=[start_time.seconds + start_time.nanos * 1e-9]
            else:
                transcribe.d[word].append(start_time.seconds + start_time.nanos * 1e-9)
    return jsonify({'link1': link1})
    print (transcribe.d)
    
# [END speech_transcribe_async_word_time_offsets_gcs]'''
@app.route('/receiver1',methods=['POST','GET'])
def search_word():
    search1 = request.form['search']         
    if search1 not in transcribe.d:
        return jsonify({'search1':[0]})
    else:
        return jsonify({'search1':transcribe.d[search1]})

@app.route('/receiver2',methods=['POST','GET'])
def func_stop_words():
    search1 = request.form['frequency']  
    new_dict=dict()
    new_dict= sorted(transcribe.d, key=lambda k: len(transcribe.d[k]), reverse=True)
    print(new_dict,transcribe.d)
    #    new_dict[k]=transcribe.d[k]
    stop_words = set(stopwords.words('english')) 
    filtered_sentence = [w for w in new_dict if not w in stop_words] 
    print(filtered_sentence)
    filtered_sentence = dict()
    for w in new_dict: 
        if w not in stop_words: 
            filtered_sentence[w]=len(transcribe.d[w])  
    #return filtered_sentence
    print(filtered_sentence)
    k=min(10,len(filtered_sentence))
    from itertools import islice
    li1= (list(islice(filtered_sentence.items(), k)))
    print(li1)
    return jsonify({'frequency':li1})

if __name__ == '__main__':
    # run!
    app.run()