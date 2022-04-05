---
layout: blank
---
//Version {{ site.version_number }}
//{{ site.urllive }}
var sliderSize = 15;
function reinitsliders() {
    var sliders = document.getElementsByClassName("rangeContainer");
    for (var i = 0; i < sliders.length; i++) {
        dragElement(sliders[i]);
    }
}
function dragElement(container) {
    var percentarray = [];
    var arr = [];
    var values = [];
    var outputcontainer = null;
    var outputformelem = null;
    var tempPreviousVal = null;
    var elmnts = null;
    var elmnt = null;
    var connect = null;
    var connectDir = null;
    var handlesQty = 0;
    createRangeSlider();
    function createRangeSlider() {
        var disabledSlider = container.dataset.hasOwnProperty('disabled') ? container.dataset.disabled : 0;
        handlesQty = container.dataset.hasOwnProperty('handles') ? container.dataset.handles : 1;
        var inner = '<div class="rangeConnector"></div><div class="rangeHandle"></div>';
        var initval = container.dataset.hasOwnProperty('start') ? container.dataset.start.split(",") : [0];
        initval.sort(function (a, b) { return a - b });
        arr = container.dataset.hasOwnProperty('array') ? JSON.parse(container.dataset.array) : arr;
        arr.sort(function (a, b) { return a - b });
        values = container.dataset.hasOwnProperty('values') ? JSON.parse(container.dataset.values) : arr;
        if (arr.length > 0) {
            createpercentArray(arr);
        } else if (values.length > 0) {
            createpercentTextArray(values.length);
        }
        if (handlesQty > 1) {
            inner = "";
            for (var i = 0; i < handlesQty; i++) {
                if (i < values.length) {
                    inner += '<div class="rangeHandle handle' + i + '"></div>';
                }
            }
        }
        container.innerHTML = inner;
        elmnts = container.getElementsByClassName("rangeHandle");
        if (handlesQty == 1) {
            connectDir = container.dataset.connect;
            connect = container.getElementsByClassName("rangeConnector")[0];
        }
        outputcontainer = document.getElementById(container.dataset.outputelem) || null;
        outputformelem = document.getElementById(container.dataset.outputformelem) || null;

        for (var i = 0; i < elmnts.length; i++) {
            elmnts[i].onmousedown = dragMouseDown;
            elmnts[i].ontouchstart = dragMouseDown;
            elmnt = elmnts[i];
            if (initval.length >= handlesQty) {
                var tempval = initval[i];
                if (!(isNaN(tempval))) { tempval = tempval * 1; }
                elementDrag(null, tempval);
            } else { elementDrag(null, values[i]); }
        }
        elmnt = null;
        if (outputcontainer != null) { outputcontainer.innerHTML = initval.join(); }
        if (outputformelem != null) {
            outputformelem.value = initval.join();
            if (outputformelem.oninput) {
                outputformelem.oninput();
            }
        }
        container.onmousedown = dragMouseDown;
        if (disabledSlider == 1) {
            container.onmousedown = null;
            for (var i = 0; i < elmnts.length; i++) {
                elmnts[i].onmousedown = null;
                elmnts[i].ontouchstart = null;
            }
        }
    }

    function createpercentTextArray(len) {
        var stepLen = 100 / (len - 1);
        percentarray.push(0);
        var currentPer = 0;
        for (var i = 1; i < len; i++) {
            currentPer += stepLen;
            percentarray.push(currentPer);
        }
    }

    function createpercentArray(arr) {
        var min, max, range;
        min = arr[0];
        max = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        range = max - min;
        for (var i = 0; i < arr.length; i++) {
            percentarray.push(((arr[i] - min) / range) * 100);
        }
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        if (outputformelem != null) {
            tempPreviousVal = outputformelem.value;
        }
        elmnt = e.target;
        newx = e.clientX || e.targetTouches[0].pageX;
        var containerleft = cumulativeOffset(container).left;
        newx -= containerleft;
        if (elmnt.className.indexOf('rangeHandle') == -1) {
            var temparr = [];
			var tempPosition = -1;
            for (var i = 0; i < elmnts.length; i++) {
				var tempPosition2 = cumulativeOffset(elmnts[i]).left - containerleft + sliderSize;
				if(tempPosition2 == tempPosition || tempPosition2 < tempPosition){tempPosition2 = tempPosition + 1;}
                temparr.push(tempPosition2);
				tempPosition = tempPosition2;
            }
            elmnt = elmnts[closestUnsorted(newx, temparr)[1]];
        }
        container.onclick = elementDrag;
        document.ontouchend = closeDragElement;
        document.onmouseup = closeDragElement;
        document.onmouseumouseout = closeDragElement;

        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e, xinit) {
        var newx = 0;
        var outputvalue = "";
        xinit = xinit || null;
        if (e != null) {
            e = e || window.event;

            e.stopPropagation();
            //e.preventDefault();
            newx = e.clientX || e.targetTouches[0].pageX;
            newx -= cumulativeOffset(container).left;
            if (newx < 0) { newx = 0; }
            if (newx > container.offsetWidth) { newx = container.offsetWidth; }
            newx = (newx / container.offsetWidth) * 100;
        }
        if (arr.length > 0 || values.length > 0) {
            var arrayvaluePair = [];
            if (xinit != null) {
                if (values.indexOf(xinit) > -1) {
                    arrayvaluePair.push(percentarray[values.indexOf(xinit)]);
                    arrayvaluePair.push(xinit);
                    outputvalue = xinit;
                } else {
                    xinit = null;
                }
            }
            if (xinit == null) {
                arrayvaluePair = closestSortedArr(newx, percentarray);
                outputvalue = values[arrayvaluePair[1]];
            }
            newx = arrayvaluePair[0];
        }
        var outputvalue2 = outputvalue;
        var tempoutputvalue2 = [];
        if (handlesQty > 1 && xinit == null) {
            var oldx = elmnt.dataset.hasOwnProperty('xpos') ? (elmnt.dataset.xpos * 1) : -1;
            for (var i = 0; i < elmnts.length; i++) {
                if (elmnts[i] == elmnt) { continue; }
                //tempoutputvalue2.push(elmnts[i].dataset.hasOwnProperty('val') ? elmnts[i].dataset.val : -1);
                var checkx = elmnts[i].dataset.hasOwnProperty('xpos') ? (elmnts[i].dataset.xpos * 1) : -1;
                tempoutputvalue2.push(checkx > -1 ? values[percentarray.indexOf(checkx)] : -1);
                if (oldx > newx && (!(newx > checkx || oldx < checkx))) {
                    arrayvaluePair = closestUnsorted(checkx, percentarray, 1);
                }
                if (oldx < newx && (!(newx < checkx || oldx > checkx))) {
                    arrayvaluePair = closestUnsorted(checkx, percentarray, -1);
                }
                newx = arrayvaluePair[0];
            }
            tempoutputvalue2.push(values[arrayvaluePair[1]]);
            tempoutputvalue2.sort(function (a, b) { 
				return values.indexOf(a) - values.indexOf(b) 
			});
            outputvalue2 = tempoutputvalue2.join();
            outputvalue = values[arrayvaluePair[1]];
        }
        elmnt.style.left = "calc(" + newx + "% - " + (sliderSize) + "px)";
        elmnt.dataset.val = outputvalue;
        elmnt.dataset.xpos = newx;
        if (outputcontainer != null) { outputcontainer.innerHTML = outputvalue2; }
        if (outputformelem != null) {
            outputformelem.value = outputvalue2;
            if (outputformelem.oninput) {
                outputformelem.oninput();
            }
        }

        if (connectDir == -1) {
            //left connect
            connect.style.width = newx + "%";
        } else if (connectDir == 1) {
            //right connect
            connect.style.left = newx + "%";
            connect.style.width = (100 - newx) + "%";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        if (outputformelem != null) {
            try {
                setTimeout(function () {
                    if (tempPreviousVal != outputformelem.value) {
                        if (outputformelem.onchange) {
                            outputformelem.onchange();
                        }
                    }
                }, 200);
            } catch{ }
        }
    }
}

function closestUnsorted(num, arr, direction) {
    direction = direction || 0;
    var curr = arr[0];
    var currIndex = 0;
    var diff = Math.abs(num - curr);
    for (var val = 0; val < arr.length; val++) {
        if ((direction == 1 && curr <= num && arr[val] > num) || (direction == -1 && curr >= num && arr[val] < num)) { curr = arr[val]; diff = Math.abs(num - arr[val]); currIndex = val; }
        if (direction == 1 && arr[val] <= num) { continue; }
        if (direction == -1 && arr[val] >= num) { continue; }
        var newdiff = Math.abs(num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
            currIndex = val;
        }
    }
    return [curr, currIndex];
}

function closestSortedArr(num, arr) {
    var mid;
    var lo = 0;
    var hi = arr.length - 1;
    while (hi - lo > 1) {
        mid = Math.floor((lo + hi) / 2);
        if (arr[mid] < num) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    if (num - arr[lo] <= arr[hi] - num) {
        return [arr[lo], lo];
    }
    return [arr[hi], hi];
}

var cumulativeOffset = function (element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top,
        left: left
    };
};