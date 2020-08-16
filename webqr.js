// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;

var imghtml='<div id="qrfile"><canvas id="out-canvas" width="310px" height="300px"></canvas>'+
    '<div id="imghelp">Tap on "Choose File" to scan QR code or select one from photos'+
	'<input type="file" onchange="handleFiles(this.files)"/>'+
	'</div>'+
'</div>';

var vidhtml = '<video id="v" autoplay></video>';

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;
  if(files.length>0)
  {
	handleFiles(files);
  }
  else
  if(dt.getData('URL'))
  {
	qrcode.decode(dt.getData('URL'));
  }
}

function handleFiles(f)
{
	var o=[];

	for(var i =0;i<f.length;i++)
	{
        var reader = new FileReader();
        reader.onload = (function(theFile) {
        return function(e) {
            gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

			qrcode.decode(e.target.result);
        };
        })(f[i]);
        reader.readAsDataURL(f[i]);
    }
}

function initCanvas(w,h)
{
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}


function captureToCanvas() {
    if(stype!=1)
        return;
    if(gUM)
    {
        try{
            gCtx.drawImage(v,0,0);
            try{
                qrcode.decode();
            }
            catch(e){
                console.log(e);
                setTimeout(captureToCanvas, 800);
            };
        }
        catch(e){
                console.log(e);
                setTimeout(captureToCanvas, 800);
        };
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function read(a)
{
    var html="<br>";
    if(a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
        html+="<a target='_blank' href='"+a+"'>"+a+"</a><br>";
    html+="<b>"+htmlEntities(a)+"</b><br><br>";
    document.getElementById("result").innerHTML=html;

    var scannedQR = document.getElementById("result").innerHTML;
    scannedQR = scannedQR.replace('<br><b>','');
    scannedQR = scannedQR.replace('</b><br><br>','');
    document.getElementById("serialnum_input").value = scannedQR;

    //decode to see if it is valid
    // Encode the String
    //var encodedString = btoa(string);
    //console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

    // Decode the String
    var decodedString = atob(scannedQR);
    if(decodedString == "312OFFICIALDEC"){
      document.getElementById("result").innerHTML="Verified! This product serial number is valid.";
    }else if(decodedString == "312OFFICIALJAN"){
      document.getElementById("result").innerHTML="Verified! This product serial number is valid.";
    }else if(decodedString == "312OFFICIALFEB"){
      document.getElementById("result").innerHTML="Verified! This product serial number is valid.";
    }else{
      document.getElementById("result").innerHTML="Sorry, this serial number is invalid.";
    }

}

function checkserial(){

  var decodedString = document.getElementById("serialnum_input").value;
  
  //example code: 1P00995AEEA008919
  
  //first three characters
  var WorldManufacturerCode = decodedString.substring(0, 3);
  
  //second four characters
  var ModelIdentifier = decodedString.substring(3, 7);
  
  //third first character
  var AdditionalMachineINFO = decodedString.substring(7, 8);
  
  //fourth first character 
  var AssignedDeereSystem = decodedString.substring(8, 9);
  
  //fifth first character 
  var CalenderYearManufactured = decodedString.substring(9, 10);
  var CYM = CalenderYearManufactured;
  
  //sixth first character 
  var CalenderMonthManufactured = decodedString.substring(10, 11);
  var CMM = CalenderMonthManufactured;
  
  //seventh six characters
  var SerialNumber = decodedString.substring(11, 17);
  
  if(CYM == "8"){
	  var CYMString = "2008";
  }else if(CYM == "9"){
	  var CYMString = "2009";
  }else if(CYM == "A"){
	  var CYMString = "2010";
  }else if(CYM == "B"){
	  var CYMString = "2011";
  }else if(CYM == "C"){
	  var CYMString = "2012";
  }else if(CYM == "D"){
	  var CYMString = "2013";
  }else if(CYM == "E"){
	  var CYMString = "2014";
  }else if(CYM == "F"){
	  var CYMString = "2015";
  }else if(CYM == "G"){
	  var CYMString = "2016";
  }else if(CYM == "H"){
	  var CYMString = "2017";
  }else if(CYM == "J"){
	  var CYMString = "2018";
  }else if(CYM == "K"){
	  var CYMString = "2019";
  }else if(CYM == "L"){
	  var CYMString = "2020";
  }else if(CYM == "M"){
	  var CYMString = "2021";
  }else if(CYM == "N"){
	  var CYMString = "2022";
  }else if(CYM == "P"){
	  var CYMString = "2023";
  }else if(CYM == "R"){
	  var CYMString = "2024";
  }else if(CYM == "S"){
	  var CYMString = "2025";
  }else if(CYM == "T"){
	  var CYMString = "2026";
  }else if(CYM == "V"){
	  var CYMString = "2027";
  }
  

  if(CMM == "A"){
	  var CMMString = "Janurary";
  }else if(CMM == "B"){
	  var CMMString = "February";
  }else if(CMM == "C"){
	  var CMMString = "March";
  }else if(CMM == "D"){
	  var CMMString = "April";
  }else if(CMM == "E"){
	  var CMMString = "May";
  }else if(CMM == "F"){
	  var CMMString = "June";
  }else if(CMM == "G"){
	  var CMMString = "July";
  }else if(CMM == "H"){
	  var CMMString = "August";
  }else if(CMM == "J"){
	  var CMMString = "September";
  }else if(CMM == "K"){
	  var CMMString = "October";
  }else if(CMM == "L"){
	  var CMMString = "November";
  }else if(CMM == "M"){
	  var CMMString = "December";
  }
  
  alert("World Manufacturer Code: " + WorldManufacturerCode + "\n" + "Model Identifier: " + ModelIdentifier + "\n" + "Additional Machine INFO: " + AdditionalMachineINFO +
  "\n" + "Assigned Deere System: " + AssignedDeereSystem + "\n" + "Calender Year Manufactured: " + CYMString + "\n" + "Calender Month Manufactured: " + CMMString +
  "\n" + "Serial Number: " + SerialNumber);
}

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}
function success(stream)
{
    v.srcObject = stream;
    v.play();

    gUM=true;
    setTimeout(captureToCanvas, 800);
}

function error(error)
{
    gUM=false;
    return;
}

function load()
{
	if(isCanvasSupported() && window.File && window.FileReader)
	{
		initCanvas(800, 500);
		qrcode.callback = read;
		document.getElementById("mainbody").style.display="inline";
        setwebcam();
	}
	else
	{
		document.getElementById("mainbody").style.display="inline";
		document.getElementById("mainbody").innerHTML='<p id="mp1">QR code scanner for HTML5 capable browsers</p><br>'+
        '<br><p id="mp2">sorry your browser is not supported</p><br><br>'+
        '<p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png"/></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif"/></a> or <a href="http://www.opera.com"><img src="Opera-logo.png"/></a></p>';
	}
  setimg();
}

function setwebcam()
{
	var options = true;
	document.getElementById("result").innerHTML="- Please scan or enter the SN -";
	if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
	{
		try{
			navigator.mediaDevices.enumerateDevices()
			.then(function(devices) {
			  devices.forEach(function(device) {
				if (device.kind === 'videoinput') {
				  if(device.label.toLowerCase().search("back") >-1)
					options={'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'} ;
				}
				console.log(device.kind + ": " + device.label +" id = " + device.deviceId);
			  });
			  setwebcam2(options);
			});
		}
		catch(e)
		{
			console.log(e);
		}
	}
	else{
		console.log("no navigator.mediaDevices.enumerateDevices" );
		setwebcam2(options);
	}
}

function setwebcam2(options)
{
	console.log(options);
	document.getElementById("result").innerHTML="- Please scan or enter the SN -";
    if(stype==1)
    {
        setTimeout(captureToCanvas, 800);
        return;
    }
    var n=navigator;
    document.getElementById("outdiv").innerHTML = vidhtml;
    v=document.getElementById("v");


    if(n.mediaDevices.getUserMedia)
    {
        n.mediaDevices.getUserMedia({video: options, audio: false}).
            then(function(stream){
                success(stream);
            }).catch(function(error){
                error(error)
            });
    }
    else
    if(n.getUserMedia)
	{
		webkit=true;
        n.getUserMedia({video: options, audio: false}, success, error);
	}
    else
    if(n.webkitGetUserMedia)
    {
        webkit=true;
        n.webkitGetUserMedia({video:options, audio: false}, success, error);
    }

    document.getElementById("qrimg").style.opacity=0.2;
    document.getElementById("webcamimg").style.opacity=1.0;

    stype=1;
    setTimeout(captureToCanvas, 800);
}

function setimg()
{
	document.getElementById("result").innerHTML="- Please scan or enter the SN -";
    if(stype==2)
        return;
    document.getElementById("outdiv").innerHTML = imghtml;
    //document.getElementById("qrimg").src="qrimg.png";
    //document.getElementById("webcamimg").src="webcam2.png";
    document.getElementById("qrimg").style.opacity=1.0;
    document.getElementById("webcamimg").style.opacity=0.2;
    var qrfile = document.getElementById("qrfile");
    qrfile.addEventListener("dragenter", dragenter, false);
    qrfile.addEventListener("dragover", dragover, false);
    qrfile.addEventListener("drop", drop, false);
    stype=2;
}
