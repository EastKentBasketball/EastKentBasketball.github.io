---
layout: blank
---
//Version {{ site.version_number }}
//{{ site.urllive }}
function getElem(id) {
	return document.getElementById(id) || null;
}

function getClass(id, parent){
	parent = parent || document;
    return parent.getElementsByClassName(id) || null;
}

function getTags(id, parent){
	parent = parent || document;
	id = id.toUpperCase();
	return parent.getElementsByTagName(id) || null;
}

function elemClickByID(id) {
    var y = getElem(id);
    y != null ? y.click() : null;
}

function displayBlockByID(id) {
    var x = getElem(id);
    x != null ? x.style.display = 'block' : null;
}

function displayNoneByID(id) {
    var x = getElem(id);
    x != null ? x.style.display = 'none' : null;
}

function toggleDisplayByID(id) {
    var x = document.getElementById(id);
    if (x != null) {
        x.style.display == 'block' ? x.style.display = 'none' : x.style.display = 'block';
    }
}

function setElemValueByID(id, val) {
    var x = getElem(id);
    (x != null) ? x.value = val : null;
}

function hasClass(el, name){
	return (el && "classList" in el)? el.classList.contains(name): false;
}

function addClasses(elem, classes){
    for (i = 0; i < classes.length; i++) {
        elem.classList.add(classes[i]);
    }
}

function removeClasses(elem, classes){
	for (i = 0; i < classes.length; i++) {
		elem.classList.remove(classes[i]);
	}	
}

function roundTo(val, decimals, dir){
	dir = dir || 0;
	decimals = decimals || 0;	
	val = val * (10 ** decimals);
	switch(dir) {
		case -1:
            val = Math.floor(val);
			break;
		case 1:
            val = Math.ceil(val);
			break;
		case 0:
			val = Math.round(val);
			break;
		default:
			return;
	} 
	
	return val / (10 ** decimals);
}

function printDivByID(id) {
    var printDiv = getElem(id);
    if (printDiv != null) {
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printDiv.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
    }
}

function IsElem(o) {
    return (o instanceof Element);
}

function getTextWidth(text, font) {
	font = font || "bold 12pt arial";
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function getComputedStylePropertyByElem(elem, property, output){
	output = output || null;
	//var elem = getElem(id);
	var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue(property);
	if(output != null){getElem(output).innerHTML = theCSSprop;}
	return theCSSprop;
}

function getComputedStyleProperty(id, property, output){
	output = output || null;
	var elem = getElem(id);
	var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue(property);
	if(output != null){getElem(output).innerHTML = theCSSprop;}
	return theCSSprop;
}

function objectToTwodArray(obj){
	var twodArray = [];
	twodArray.push(Object.keys(obj[0]));
	for (var i = 0; i < obj.length; i++){
		twodArray.push(Object.values(obj[i]));
	}
	return twodArray;
}

var GBPFormatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
});

var iconDownArrow = "<path d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z'/>";
var iconUpArrow = "<path d='M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z'/>";
var iconCross = "<path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'></path>";
function wrapPath(path, tags) {
    tags = tags || "";
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' " + tags + " >" + path + "</svg>"
}

function StringReplaceAll(str, search, replacement) {
	str = str.toString();
    return str.replace(new RegExp(search, 'g'), replacement);
}