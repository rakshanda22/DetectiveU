# DetectiveU

## Inspiration
When you are looking for something but cannot find it in the entire video you watched for an hour. Like you want to study how to create buttons in html, you watch an entire video of tutorial but couldn't find that.

## What it does
DetectiveU is a search engine built for text inside youtube videos. It is a chrome extension that extracts text and then a user can just search for terms and navigate to the exact video location where the word has been mentioned. It lets you easily navigate through the video, quickly find and lets you to certain parts you are looking for.

## How we built it
We first converted youtube videos to mp3 files using youtubedl and stored it to the google cloud storage. This audio file was then used by the google speech to text API to create a list containing the words and its corresponding timings in the video. Once a query for a particular term has been made, the video navigates there. Apart from this we have used python's Natural Language Processing tool to eliminate all the unnecessary stop words and print the list of the most used words. All this was added to a chrome extension.

## Challenges we ran into
We first had issues communicating between front (JavaScript) and the backend flask server (python) because of the strict implementation policy of google chrome for their extensions which does not allow requests to be send among files stored on different domains. Hence communicating between files gave us CORS error. This was the most challenging part of us. Moreover google cloud has limitation of processing and long videos which was necessity for our use case. Moreover we are not allowed to use certain API's relating to data visualization because of the chrome' extensions workflow structure (where we could cannot transfer back to html file from javascript file).

## Accomplishments that we're proud of
We think that this project will at least be useful to us for our study period and the most important aspect is that we have learned a lot in such short period of time, which we though would have never been able to achieve.

## What we learned
The primary and the most import thing: GCP cloud APIs as cloud computing is most demanding in market today. We also learned many important things like Flask server, RESTful architecture.

## What's next for DetectiveU
Next we have planned on storing the transcribed data to the machine, so that if I access the same video again, I need not wait for it to analyze and generate transcript. Also we aim to provide summary of video as it can again save time.

## Built With
gcp-speech-to-text-api
python3
youtube-dl
gcp-storage
javascript
html5
css
