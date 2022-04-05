---
layout: blank
---
//Version {{ site.version_number }}
//{{ site.urllive }}

var linkProjectsDynamic = [ {% assign sorted_pages = site.pages | sort:"url" %}{% for p in sorted_pages %}{%- if p.title -%}{Name:'{{ p.title }}',URL:'{{ p.url }}'},{%- endif -%}{% endfor %} ];
var linkBase = "https://jovialbadger.co.uk"
var linkReddit = "https://www.reddit.com/u/jovialbadger";
var linkBuyMeACoffee = "https://www.buymeacoffee.com/JovialBadger";
var linkGithub = "https://github.com/JovialBadger/jovialbadger.github.io";

var testpostsJSON = "{% assign sorted_posts = site.posts | sort:"url" %}{% for x in sorted_posts %}{%- if x.title -%}{{ x.url }}:'{{ x.title }}',{%- endif -%}{% endfor %}";

var links = "";
var navItems = "";
var projectOptions = "";
var iconReddit = "<path d='M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z'/>";
var iconBuyMeACoffee = "<path d='M22 2.427c-1.302 0-2.441-1.043-2.441-2.427h-15.149c0 1.382-1.105 2.427-2.41 2.427v1.573h20v-1.573zm-19 3.573l3.031 18h11.938l3.031-18h-18zm4.049 12l-1.01-6h11.923l-1.01 6h-9.903z'/>";
var iconGithub = "<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>";
var iconMenu = "<path d='M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z'/>";
var iconSetting = "<path d='M17 10.645v-2.29c-1.17-.417-1.907-.533-2.28-1.431-.373-.9.07-1.512.6-2.625l-1.618-1.619c-1.105.525-1.723.974-2.626.6-.9-.373-1.017-1.116-1.431-2.28h-2.29c-.412 1.158-.53 1.907-1.431 2.28h-.001c-.9.374-1.51-.07-2.625-.6l-1.617 1.619c.527 1.11.973 1.724.6 2.625-.375.901-1.123 1.019-2.281 1.431v2.289c1.155.412 1.907.531 2.28 1.431.376.908-.081 1.534-.6 2.625l1.618 1.619c1.107-.525 1.724-.974 2.625-.6h.001c.9.373 1.018 1.118 1.431 2.28h2.289c.412-1.158.53-1.905 1.437-2.282h.001c.894-.372 1.501.071 2.619.602l1.618-1.619c-.525-1.107-.974-1.723-.601-2.625.374-.899 1.126-1.019 2.282-1.43zm-8.5 1.689c-1.564 0-2.833-1.269-2.833-2.834s1.269-2.834 2.833-2.834 2.833 1.269 2.833 2.834-1.269 2.834-2.833 2.834zm15.5 4.205v-1.077c-.55-.196-.897-.251-1.073-.673-.176-.424.033-.711.282-1.236l-.762-.762c-.52.248-.811.458-1.235.283-.424-.175-.479-.525-.674-1.073h-1.076c-.194.545-.25.897-.674 1.073-.424.176-.711-.033-1.235-.283l-.762.762c.248.523.458.812.282 1.236-.176.424-.528.479-1.073.673v1.077c.544.193.897.25 1.073.673.177.427-.038.722-.282 1.236l.762.762c.521-.248.812-.458 1.235-.283.424.175.479.526.674 1.073h1.076c.194-.545.25-.897.676-1.074h.001c.421-.175.706.034 1.232.284l.762-.762c-.247-.521-.458-.812-.282-1.235s.529-.481 1.073-.674zm-4 .794c-.736 0-1.333-.597-1.333-1.333s.597-1.333 1.333-1.333 1.333.597 1.333 1.333-.597 1.333-1.333 1.333zm-4 3.071v-.808c-.412-.147-.673-.188-.805-.505s.024-.533.212-.927l-.572-.571c-.389.186-.607.344-.926.212s-.359-.394-.506-.805h-.807c-.146.409-.188.673-.506.805-.317.132-.533-.024-.926-.212l-.572.571c.187.393.344.609.212.927-.132.318-.396.359-.805.505v.808c.408.145.673.188.805.505.133.32-.028.542-.212.927l.572.571c.39-.186.608-.344.926-.212.318.132.359.395.506.805h.807c.146-.409.188-.673.507-.805h.001c.315-.131.529.025.924.213l.572-.571c-.186-.391-.344-.609-.212-.927s.397-.361.805-.506zm-3 .596c-.552 0-1-.447-1-1s.448-1 1-1 1 .447 1 1-.448 1-1 1z'/>";

//var linkProjects = [{Name: 'Art', Children: [{Name: 'Drawing'}]},{Name: 'About'},{Name: 'Coding', Children: [{Name: 'Web', Children: [{Name:'Calculator'},{Name: 'Clock'},{Name: 'Converter'},{Name:'Table_Search'}]}]}];

docReady(function () {
	initPage();
});
function initPage(){
	initNav();
	replacePlaceholders();
	//tableCollapse(true);
	initiDropdowns();
}

function linksCreate(){
	var list = testJson.split(",");
	for (var i = 1; i < list.length -1; i++){
		var page = list[i].split(":");
	}
}

function replacePlaceholders(){
	//document.body.innerHTML = StringReplaceAll(document.body.innerHTML, '[(!BuyMeACoffee!)]', linkBuyMeACoffee);
	PlaceholdersFill("svg-cross");
	PlaceholdersFill("svg-menu");
	PlaceholdersFill("svg-setting");
	var year = document.getElementsByClassName('currentYear');
	var d = new Date();
	var currentYear = d.getUTCFullYear();
	for (var i = 0; i < year.length; i++){
		year[i].innerHTML = currentYear;
	}
}	

function PlaceholdersFill(id) {
    phClass = getClass(id);
    if (phClass.count != 0 && phClass != null) {
        for (c = 0; c < phClass.length; c++) {
			switch (id) {
				case "svg-cross":
					phClass[c].innerHTML = 	wrapPath(iconCross)
					break;
				case "svg-menu":
					phClass[c].innerHTML = 	wrapPath(iconMenu)
					break;
				case "svg-setting":
					phClass[c].innerHTML = 	wrapPath(iconSetting)
					break;
				default:
					phClass[c].innerHTML = "";
			}            
        }
    }
}

function initNav(page){
	printArray(linkProjectsDynamic);
	links = "<ul>" + links + "</ul>";
	navItems = "<ul><li><a href='/'>Home</a></li>" + navItems + "</ul>";
	var navContent = wrapPath(iconCross, "id='navClose' onclick='toggleModal(\"navContainer\");'") + "<div id='navContent'><div id='navMenu'>" + navItems + "</div><hr /></div>";
	var Nav = getElem('navContainer')
	if(Nav != null){
		Nav.innerHTML = navContent;
	}
}

function createSubNav(currentLocation){
	var Elem = getElem("projectLinks");
	if(Elem != null){
		Elem.innerHTML = getSubArray(currentLocation).outerHTML;
	}
}

function createBreadCrumbs(currentLocation){
	if(currentLocation != ""){
		var Crumbs = getElem("breadCrumbs");
		if(Crumbs != null){
			var locationCrumbs = currentLocation.split("/");
			var breadCrumbLinks = " / <a href=''>Home</a>";
			var breadCrumbPath = "";
			for (var i = 0; i < locationCrumbs.length - 1; i++){
				breadCrumbPath += "/" + locationCrumbs[i];
				if(breadCrumbPath.startsWith("/")){
					breadCrumbPath = breadCrumbPath.substring(1);
				}
				breadCrumbLinks += " / <a href='" + breadCrumbPath.toLowerCase() + "'>" + StringReplaceAll(locationCrumbs[i], "_", " ") + "</a>";
			}
			Crumbs.innerHTML = breadCrumbLinks;
		}
	}
}

function getSubArray(subPath){
	subPath = subPath || "";
	var div = document.createElement("DIV");
	div.innerHTML = links;
	if(subPath == ""){
		return getTags("UL", div)[0];
	} else{
		var linkElems = getTags("A", div);
		for (var i = 0; i < linkElems.length; i++){
			if(linkElems[i].href.toUpperCase().endsWith(subPath.toUpperCase())){
				return getTags("UL", linkElems[i].parentElement)[0];
			}
		}
	}
}

var printArray = function(arr) {
    links = "";
    navItems = "";
    var currentLevel = "";
    for (var i = 1; i < arr.length; i++) {
        var url = arr[i].URL;
        if (url.startsWith("/")) {
            url = url.substring(1);
        }
        if (url.endsWith("/")) {
            url = url.substring(0, url.length - 1);
        }
        var currentLeveltemp = currentLevel;
        var templateString = "";
        templateString = "<li><a href='" + url + "'>" + arr[i].Name + "</a>";
        links += templateString;
        navItems += templateString;
        projectOptions += "<option value='" + url + "'>" + StringReplaceAll(url, "_", " ") + "</option>";
        if (i + 1 < (arr.length)) {
            var urlp1 = arr[i + 1].URL;
            if (urlp1.startsWith("/")) {
                urlp1 = urlp1.substring(1);
            }
            if (urlp1.endsWith("/")) {
                urlp1 = urlp1.substring(0, urlp1.length - 1);
            }

            if (urlp1.startsWith(url)) {
                currentLevel = url;
                links += "<ul>";
                navItems += "<span onclick='toggleNavSubMenu(this);'>" + wrapPath(iconDownArrow) + "</span>" + "<ul style='display:none;'>";
            }
            if (urlp1.startsWith(currentLevel)) {} else {
                currentLevel = "";
            }
        } else if (i == arr.length - 1) {
            links += "</li>";
            navItems += "</li>";
            var x = currentLevel.split("/");
            for (var j = 0; j < x.length; j++) {
                links += "</ul>";
                navItems += "</ul>";
                links += "</li>";
                navItems += "</li>";
            }

        } else {
            currentLevel = "";
        }
        if (currentLevel == "" && currentLeveltemp != currentLevel) {
            links += "</li>";
            navItems += "</li>";
            links += "</ul>";
            navItems += "</ul>";
            links += "</li>";
            navItems += "</li>";
        } else if (currentLevel != "" && currentLeveltemp == currentLevel && (i != arr.length - 1)) {
            links += "</li>";
            navItems += "</li>";
        } else if (currentLevel == "") {
            links += "</li>";
            navItems += "</li>";
        }
    }
}

function toggleNavSubMenu(node){
	var childNode = node.parentNode.getElementsByTagName("UL")[0];
	toggleDisplayNode(childNode);
	if(childNode.style.display == "block"){
		node.parentNode.getElementsByTagName("SPAN")[0].innerHTML = wrapPath(iconUpArrow);
	} else{
		node.parentNode.getElementsByTagName("SPAN")[0].innerHTML = wrapPath(iconDownArrow);
	}	
}

function toggleModal(id){
	var elem = getElem(id)
	if(elem != null){
		if(elem.style.width == "0px"){
			elem.style.width = "100%";
		} else{
			elem.style.width = "0px";			
		}
	}	
}

function toggleDisplay(id){
	var elem = getElem(id)
	if(elem != null){
		if(elem.style.display == "block"){
			elem.style.display = "none";
		} else{
			elem.style.display = "block";			
		}
	}	
}

function toggleDisplayNode(node){
	if(node.style.display == "block"){
		node.style.display = "none";
	} else{
		node.style.display = "block";		
	}	
}

function getChildNodesByTag(node, tagName) {
    var children = new Array();
    for(var child in node.childNodes) {
        if(node.childNodes[child].nodeName == tagName.toUpperCase()) {
            children.push(node.childNodes[child]);
        }
    }
    return children;
}

function message(txt, heading){
	txt = txt || "";
	heading = heading || "Alert";
	var messageElem = getElem('divMessageModal');
	messageElem.style.display = 'none';
	getClass("messageHeading",messageElem)[0].innerHTML = heading;
	getClass("messageText",messageElem)[0].innerHTML = txt;
	if(txt !=""){
		messageElem.style.display = 'block';
	}
}

function rangeGenerator(start, end, step){
	start = start || 0;
	end = end || 100;
	step = step || 1;
	var range = ",";
	var val = start;
	while(val < end){
		range += val + ",";
		val += step;
		val = roundTo(val, decimalCount(step));
	}
	if(range.indexOf("," + end + ",") == -1){
		range += end + ",";	
	}
	if (range.endsWith(","))
	{
		range = range.substring(0, range.length - 1);
	}
	if (range.startsWith(","))
	{
		range = range.substring(1, range.length);
	}
	return range;
}

function decimalCount(val) {
  let text = val.toString()
  if (text.indexOf('e-') > -1) {
    let [base, trail] = text.split('e-');
    let deg = parseInt(trail, 10);
    return deg;
  }
  if (Math.floor(val) !== val) {
    return val.toString().split(".")[1].length || 0;
  }
  return 0;
}