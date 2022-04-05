---
layout: blank
---
//Version {{ site.version_number }}
//{{ site.urllive }}

function dynamicNavOpen(a){	
	var w = window.innerWidth;
	if(w < 600){
		var e = e || window.event;
		e.preventDefault();
		var target = e.target;
		while (target.nodeName != "SPAN"){if(target.parentNode){target = target.parentNode;} else{return;}}
		a = a || "";
		var linkContainers = (a == "sub" ? target.parentNode.children[1].children : target.parentNode.children[2].children);
		var iStart = (a == "sub" ? 0 : 1);
		for (var i = iStart; i < linkContainers.length; i++) {
			toggleDisplayElem(linkContainers[i]);
		}		
	}	
}


function toggleDisplayElem(elem){
	if(elem != null){
		if(elem.style.display == "block"){
			elem.style.display = "none";
		} else{
			elem.style.display = "block";			
		}
	}	
}

function dynamicNavResize(){
	resizeNav();
	function resizeNav(){
		var w = window.innerWidth;
		if(w > 599){
			var navs = getClass('dynamicNav');
			for (var i = 0; i < navs.length; i++) {
				var linkContainers = getTags("LI",navs[i]);
				for (var j = 0; j < linkContainers.length; j++) {
					linkContainers[j].style.display = "";				
				}
			}			
		}
	}
    window.addEventListener('resize', resizeNav);
}	




function dynamicNavCreate(str, navList){
	innerhtml = str || "";
	navList = navList || [];
	var downArrow = wrapPath(iconDownArrow);
	for (var i = 0; i < navList.length; i++) {
		if(navList[i].URLS){
			innerhtml = innerhtml + "<li><span onclick='dynamicNavOpen(\"sub\")'>" + navList[i].Name + " <b>" + downArrow + "</b></span><ul>"
			innerhtml = dynamicNavCreate(innerhtml, navList[i].URLS)+ "</ul></li>";
		} else{
			innerhtml = innerhtml + "<li><a href='" + navList[i].URL + "'>" + navList[i].Name + "</a></li>";
		}
	}
	return innerhtml;
}

function dynamicNavInit(id, arr, extraHTML){
	extraHTML = extraHTML || "";
	arr = arr || [];
	id = id || 'divNavFromArray';
	getElem(id).innerHTML = "<span class='dynamicNavMenu' onclick='dynamicNavOpen()'>" + wrapPath(iconMenu) + "</span><span class='dynamicNavExtra'>" + extraHTML + "</span>" + dynamicNavCreate("<ul class='dynamicNav'>", arr) + "</ul>";
}