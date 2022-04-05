---
layout: blank
---
//Version {{ site.version_number }}
//{{ site.urllive }}
var target = getTags("HTML")[0];
window.addEventListener("click", function (e) {
    e = e || window.event;
    var newTarget = e.target;
    if (target == newTarget) { return; }
    var temptarget = target;
    target = newTarget;
    var tempNewTarget = newTarget;
    while (!(hasClass(tempNewTarget, "custom-select"))) {
		if(temptarget.nodeName){
			if (tempNewTarget.nodeName == "HTML") { selectOptionsClearAll(); return; }
			if (tempNewTarget.nodeName == "SVG") { return; }
		}
		if(!(tempNewTarget.parentNode)){return;}		
        tempNewTarget = tempNewTarget.parentNode;
    }
    while (!(hasClass(temptarget, "custom-select"))) {
		if(temptarget.nodeName){
			if (temptarget.nodeName == "HTML") { return; }
			if (temptarget.nodeName == "SVG") { return; }
		}
		if(!(tempNewTarget.parentNode)){return;}		
        temptarget = temptarget.parentNode;
    }
    var x = temptarget.getElementsByTagName("*");
    for (var i = 0; i < x.length; i++) {
        if (x[i] == newTarget) { return; }
    }
    selectOptionsClear(temptarget)
});

function initiDropdowns() {
    var y = getClass("custom-select");
    while (y.length > 0) {
        y[0].remove();
    }
    var x = getTags('select');
    for (i = 0; i < x.length; i++) {
        selectcreate(x[i]);
    }
}

function initiDropdown(elem, id, clear) {
    clear = clear || false;
    elem.parentElement.parentElement.remove();
    var selectItem = getElem(id);
    var tempval = selectItem.value;
    if (clear) {
        selectItem.value = "";
    }
    selectcreate(selectItem);
    if (tempval != selectItem.value) {
        if (selectItem.onchange) {
            selectItem.onchange();
        }
    }
}

function selectcreate(elem) {
    elem.style.display = "none";
    var placeholder = elem.getAttribute('placeholder') || "Select An Option...";
    var isDisabled = elem.hasAttribute("disabled");
    var onclick = (!(isDisabled)) ? "onclick='selectOptionsCreate(\"" + elem.id + "\", this)'" : "";
    var onclickRemove = (!(isDisabled)) ? "onclick='initiDropdown(this, \"" + elem.id + "\", true)'" : "";
    var disabled = isDisabled ? "-disabled" : "";
    var removeSelection = elem.dataset.hasOwnProperty('deselectable') ? elem.dataset.deselectable : 0;
    if (elem.value != "") {
        var options = getTags("OPTION", elem);
        for (var i = 0; i < options.length; i++) {
            if (options[i].value == elem.value) {
                placeholder = options[i].innerHTML;
            }
        }
    }// onfocusout='selectOptionsClearAll()'
    var x = "<div class='" + elem.className + " custom-select' tabindex='0' ><span " + onclick + " class='custom-select-label" + disabled + "'><span class='custom-select-text'>" + placeholder + "</span>"
    if (removeSelection == "1") { x += "<span " + onclickRemove + " class='custom-select-remove'>" + wrapPath(iconCross) + "</span>" }
    x += "<span class='custom-select-icon'>" + wrapPath(iconDownArrow) + "</span></span><div class='custom-select-options'></div></div>";
    var div = document.createElement('div');
    div.innerHTML = x;
    elem.parentNode.insertBefore(div.children[0], elem.nextSibling);
}

function selectOptionsCreate(id, elem) {
    var x = getElem(id);
    var y = getTags("option", x);
    var z = getClass("custom-select-options", elem.parentElement)[0];
    var a = getClass("custom-select-icon", elem.parentElement)[0];
    var create = false;
    if (z.innerHTML == "") {
        create = true;
    }
    selectOptionsClearAll();
    if (create) {
        a.innerHTML = wrapPath(iconUpArrow);
        var inner = "";
        if (y.length > 8) {
            inner += "<div class='custom-select-search' style='top:1px;'><input type='text' placeholder='Type To Search...' onkeyup='selectOptionsSearch(this);' /></div><ul style='top:36px;'>";
        } else {
            inner += "<ul style='top:1px;'>";
        }
        var enabledCount = 0;
        for (var i = 0; i < y.length; i++) {
            if ((!(y[i].disabled)) && y[i].innerHTML != "") {
                inner += "<li onclick='selectOptionsClick(\"" + id + "\",\"" + y[i].value + "\", this)'>" + y[i].innerHTML + "</li>";
                enabledCount++;
            }
        }
        if (enabledCount == 0) { inner += "<li>Nothing Here</li>" }
        z.innerHTML = inner + "</ul>";
        var b = getTags("input", z);
        if (b.length > 0) { b[0].focus(); }
    }
}

function selectOptionsSearch(elem) {
    var x = elem.parentElement.parentElement;
    var a = getTags("ul", x)[0];
    var y = getTags("li", a);
    for (var i = 0; i < y.length; i++) {
        y[i].style.display = "none";
        var z = y[i].textContent || y[i].innerText;
        if (z.toUpperCase().indexOf(elem.value.toUpperCase()) > -1) {
            y[i].style.display = "";
        }
    }
}

function selectOptionsClear(elem) {
    getClass("custom-select-options", elem)[0].innerHTML = "";
    getClass("custom-select-icon", elem)[0].innerHTML = wrapPath(iconDownArrow);
}

function selectOptionsClearAll() {
    var a = getClass("custom-select-options");
    for (var i = 0; i < a.length; i++) {
        a[i].innerHTML = "";
    }

    var b = getClass("custom-select-icon");
    for (var i = 0; i < b.length; i++) {
        b[i].innerHTML = wrapPath(iconDownArrow);
    }
}

function selectOptionsClick(id, value, elem) {
    var x = getElem(id);
    var tempval = x.value;
    x.value = value;
    var z = getClass("custom-select-text", elem.parentElement.parentElement.parentElement)[0];
    z.innerHTML = elem.innerHTML;
    selectOptionsClearAll();
    if (tempval != value) {
        if (x.onchange) {
            x.onchange();
        }
    }
}