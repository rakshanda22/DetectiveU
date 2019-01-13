var oldURL= ''
document.getElementById('Analyse').addEventListener("click",extracturl)
document.getElementById('Submit').addEventListener("click",passparams)
document.getElementById('Frequency').addEventListener("click",passparams2)
chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
    var tab = tabs[0];
    oldURL = tab.url ;
    var idnum = tab.id
    console.log(oldURL)
}
);

function extracturl(){
 /* var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5000/", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("link="+oldURL);
  xhttp.onreadystatechange = function (){
  var data = JSON.parse(xhttp.responseText);
  console.log('data link='+data.link1)
}*/

  var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'json';
  xhttp.open("POST", "http://127.0.0.1:5000/", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("link="+oldURL);
  xhttp.onload = function (){
  console.log(xhttp.response)
  var data = xhttp.response;
  console.log('data link='+data.link1)
}
}


function passparams(){
  var search = document.getElementById('search').value
  console.log("Inside PassParmeters")
  console.log(search)
  var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'json';
  xhttp.open("POST", "http://127.0.0.1:5000/receiver1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("search="+ search);
  xhttp.onload = function (){
  console.log(xhttp.response)
  var data1 = xhttp.response;
  console.log('search output='+data1.search1)
  /*var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5000/receiver1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("search="+ search);
  xhttp.onreadystatechange = function (){
  var data1 = JSON.parse(xhttp.responseText);
  console.log('data link='+data1.search1)*/
  var data = data1.search1//[10,20,30]
  var bid=[];
  for (var b = 0; b< data.length; b++){
    var btn = document.createElement("button");
    btn.id=data[b];
    bid.push(btn.id);
    var t = document.createTextNode(data[b])
    btn.appendChild(t)
    document.body.appendChild(btn);
  }
  window.onclick = e => {
    console.log(e.target);
    console.log(e.target.id);
    if(e.target.id!=="Submit"&&e.target.id!=="Analyse"&&e.target.id!=="Frequency") {
      chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
      chrome.tabs.update(tabs[0].id,{url:oldURL+'&t='+Math.floor(e.target.id)});
        });
    }
}
 /* var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'json';
  xhttp.open("POST", "http://127.0.0.1:5000/receiver1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("search="+ search);
  xhttp.onload = function (){
  console.log(xhttp.response)
  var data = xhttp.response;
  console.log('search output='+data.search1)

}*/
}
}

function passparams2(){
  //var search = document.getElementById('search').value
  
  /*console.log("Inside PassParmeters")
  //console.log(search)
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5000/receiver2", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("frequency="+0);
  xhttp.onreadystatechange = function (){
  var data = JSON.parse(xhttp.responseText);
  console.log('frequency='+data.frequency)
}*/
  var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'json';
  xhttp.open("POST", "http://127.0.0.1:5000/receiver2", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("frequency="+ oldURL);
  xhttp.onload = function (){
  console.log(xhttp.response)
  var data = xhttp.response;
  console.log('frequency output='+data.frequency)
  //var person = {fname:"John", lname:"Doe"};
  var freq=data.frequency
  
  for(i=0;i<freq.length;i+=2)
    text=""
    text += freq[i] + ":"+freq[i+1]+" ";
  }
    var t = document.createTextNode(text);
    document.body.appendChild(t);

}

/*  const data1 = JSON.stringify(msg)
  console.log(data1)
  console.log('Making AJAX CALL')
  $.ajax({
    type: "GET",
    url: "http://localhost:5000",
    data: {param:oldURL}
  });*/
console.log("Inside input.js")
}
