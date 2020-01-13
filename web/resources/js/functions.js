var lastId = "";

//текущие значения переменных
var x;
var y;
var rValue;

var yCurrent;
var xCurrent;
var boolX=0;
var boolY=0;
var boolR=0;
var svg; //график
var previousR = null; //переменная для хранения прошлого радиуса

// работа с массивом кнопок
function doAction(value, id) {
    document.getElementById(id).style.backgroundColor = "crimson";
    if((lastId!="")&&(lastId!=id)){
    document.getElementById(lastId).style.backgroundColor = "aliceblue";}
    lastId = id;
    document.getElementById("newPointForm:x").setAttribute("value",value);

}

// проверка значения на число
function isNumber(n) {
    if ((/^[-]?[0-9]+[.,][0-9]+$/.test(n)) || (/^[-]?[0-9]+$/.test(n))) {
        return true;
    } else {
        return false;
    }
}

window.onload = function () {
};


function changeGrafic(value) {

    if (validR(value)) {
        document.getElementById("draw:rSVG").setAttribute("value",value);
        var r = value;
        r = r.replace(/,/g, '.');
        document.getElementById('rightOnTheEdge').innerHTML = r;
        document.getElementById('topOnTheEdge').innerHTML = r;
        document.getElementById('downOnTheEdge').innerHTML = ("-" + r);
        document.getElementById('leftOnTheEdge').innerHTML = ("-" + r);
        document.getElementById('rightMiddle').innerHTML = "" + r / 2;
        document.getElementById('topMiddle').innerHTML = "" + (r / 2);
        document.getElementById('downMiddle').innerHTML = ("-" + r / 2);
        document.getElementById('leftMiddle').innerHTML = ("-" + r / 2);

        var points = document.getElementsByTagName("circle");
        if (points.length > 1) { //если точки у нас уже есть (нарисованы)
            for (var i = 0; i < points.length; i++) {
                if (previousR != null) {
                    var point = points[i];
                    point.setAttribute("cx", (point.getAttribute("cx") - 150) / 120 * previousR / rValue * 120 + 150);
                    point.setAttribute("cy", -(-(point.getAttribute("cy") - 150) / 120 * previousR / rValue * 120) + 150);
                    var cx = (point.getAttribute("cx") - 150) / 120 * r;
                    var cy = -(point.getAttribute("cy") - 150) / 120 * r;
                    if (((cy >= 0) && (cx <= 0) && (cy <= rValue/2) && (cx >= -rValue)) || (((cx * cx + cy * cy) <= rValue * rValue/4) && (cx <= 0) && (cy <= 0)) || ((cx >= 0) && (cy <= 0) && (cy >= (2*cx - rValue)))) {
                        point.setAttribute("fill", "green");
                    } else {
                        point.setAttribute("fill", "red");
                    }
                }
            }
        }else{
            if (document.getElementById('pointTable')) {
                var table_x = document.getElementsByClassName("xTable");
                var table_y = document.getElementsByClassName("yTable");
                var table_r = document.getElementsByClassName("rTable");
                var svgNS = document.getElementById("group").namespaceURI;
                for (var l = 0; l < table_x.length; l++) {
                    var circle = document.createElementNS(svgNS, "circle");
                    circle.setAttribute("cx", (table_x[l].innerText / r * 120 + 150));
                    circle.setAttribute("cy", (-table_y[l].innerText / r * 120) + 150);
                    circle.setAttribute("r", "3");
                    circle.setAttribute("fill", "black");
                    cx = table_x[l].innerText;
                    cy = table_y[l].innerText;
                    if (((cy >= 0) && (cx <= 0) && (cy <= rValue/2) && (cx >= -rValue)) || (((cx * cx + cy * cy) <= rValue * rValue/4) && (cx <= 0) && (cy <= 0)) || ((cx >= 0) && (cy <= 0) && (cy >= (2*cx - rValue)))) {
                        circle.setAttribute("fill", "green");
                    } else {
                        circle.setAttribute("fill", "red");
                    }
                    document.getElementById("group").appendChild(circle);
                }
            }
        }
        previousR = r;
    } else {
        updateGrafic();
    }
}
function validR(value) {
    boolR=0;
    document.getElementById("newPointForm:mesR").innerText="";
    rValue=value;
    var r = document.getElementById("newPointForm:r");
    var error = document.getElementById("errorR");
    r.style.backgroundColor="";
    error.innerText="";
    document.getElementById("newPointForm:submit").removeAttribute("disabled");

    if (!value) {
        r.style.backgroundColor="";
        error.innerText="Enter something";
        document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
        return false;
    } else {
        if (!isNumber(value)) {
            r.style.backgroundColor="red";
            error.innerText="Enter a NUMBER";
            document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
            return false;
        } else {
            value = value.replace(/,/g, '.');
            if ((1 <= value) && (Math.ceil(value) <= 4)) {
                if(/^[0]+[1-9]+/.test(value.slice(value.indexOf('\.')+1))&&(value==4)){
                    r.style.backgroundColor="red";
                    error.innerText="Not include in range";
                    document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
                    return false;
                }
                if(/^[9]+[0-9]+/.test(value.slice(value.indexOf('\.')+1))&&(value==1)){
                    r.style.backgroundColor="red";
                    error.innerText="Not include in range";
                    document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
                    return false;
                }
                boolR=1;
                if(boolX&&boolY){document.getElementById("newPointForm:submit").removeAttribute("disabled");}
                return true;
            } else {
                r.style.backgroundColor="red";
                error.innerText="Not include in range";
                document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
                return false;
            }
        }
    }
}
function validX(value) {
    boolX=0;
    document.getElementById("newPointForm:mesX").innerText="";
    xCurrent=value;
    var x = document.getElementById("newPointForm:x");
    var error = document.getElementById("errorX");
    x.style.backgroundColor="";
    error.innerText="";

    if (!value) {
        x.style.backgroundColor="";
        error.innerText="Enter something";
        document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
        return false;
    } else {
        if (!isNumber(value)) {
            x.style.backgroundColor="red";
            error.innerText="Enter a NUMBER";
            document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
            return false;
        } else {
            value = value.replace(/,/g, '.');
            if ((-5 <= value) && (value <= 3)) {
                boolX=1;
                if(boolR&&boolY){document.getElementById("newPointForm:submit").removeAttribute("disabled");}
                return true;
            } else {
                x.style.backgroundColor="red";
                error.innerText="Not include in range";
                document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
                return false;
            }
        }
    }
}
function validY(value) {
    boolY=0;
    document.getElementById("newPointForm:mesY").innerHTML="";
    yCurrent = value;
    var y = document.getElementById("newPointForm:y");
    var error = document.getElementById("errorY");
    y.style.backgroundColor="";
    error.innerText="";

    if (!value) {
        y.style.backgroundColor="";
        error.innerText="Enter something";
        document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
        return false;
    } else {
        if (!isNumber(value)) {
            y.style.backgroundColor="red";
            error.innerText="Enter a NUMBER";
            document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
            return false;
        } else {
            value = value.replace(/,/g, '.');
            if ((-3 <= value) && (value <= 3)) {
                if(/^[0]+[1-9]+/.test(value.slice(value.indexOf('\.')+1))&&(value==3)){
                    y.style.backgroundColor="red";
                    error.innerText="Not include in range";
                    document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
                    return false;
                }
                if(/^[0]+[1-9]+/.test(value.slice(value.indexOf('\.')+1))&&(value==-3)){
                    y.style.backgroundColor="red";
                    error.innerText="Not include in range";
                    document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
                    return false;
                }
                boolY=1;
                if((boolR)&&(boolX)){document.getElementById("newPointForm:submit").removeAttribute("disabled");}
                return true;
            } else {
                y.style.backgroundColor="red";
                error.innerText="Not include in range";
                document.getElementById("newPointForm:submit").setAttribute("disabled","disabled");
                    return false;
            }
        }
    }
}
function cleanForm() {
    var points = document.getElementsByTagName("circle");
    var l = points.length;
    for (var i = 0; i < l; i++) {
        points[i].setAttribute("fill","none");
    }
    var buttons = document.getElementsByClassName("button");
    if (buttons.length > 1) {
        for (var k = 0; k < buttons.length; k++) {
            buttons[k].style.backgroundColor = "aliceblue";}
    }
    changeGrafic(document.getElementById("newPointForm:r").getAttribute("value"));
}

window.onload = function () {
    svg = document.getElementsByTagName("svg");
    svg[0].addEventListener('click', handlerClick);
    // document.getElementById("newPointForm:r").setAttribute("value","");
    // var svgNS = document.getElementById("group").namespaceURI;
    // cleanForm();
    document.getElementById("render").click();
};

function handlerClick(event) {
    if (validR(rValue)) {
        x = (event.offsetX - 150) / 120 * rValue;
        y = -(event.offsetY - 150) / 120 * rValue; //cy-150=-y/rvalue*120+150
        document.getElementById("draw:xSVG").setAttribute("value",x);
        document.getElementById("draw:ySVG").setAttribute("value",y);
        draw(event.offsetX, event.offsetY);
        document.getElementById("draw:submitSVG").click();
    } else {
    }
}
function draw(xSVG, ySVG) {
    var svgNS = document.getElementById("group").namespaceURI;
    var circles = document.createElementNS(svgNS, "circle");
    circles.setAttribute("cx", xSVG);
    circles.setAttribute("cy", ySVG);
    circles.setAttribute("r", "3");
    circles.setAttribute("fill", "black");

    var cx = (xSVG - 150) / 120 * rValue;
    var cy = -(ySVG - 150) / 120 * rValue;
    if (((cy >= 0) && (cx <= 0) && (cy <= rValue/2) && (cx >= -rValue)) || (((cx * cx + cy * cy) <= rValue * rValue/4) && (cx <= 0) && (cy <= 0)) || ((cx >= 0) && (cy <= 0) && (cy >= (2*cx - rValue)))) {
        circles.setAttribute("fill", "green");
    } else {
        circles.setAttribute("fill", "red");
    }
    document.getElementById("group").appendChild(circles);
}
function updateGrafic(){
    var points = document.getElementsByTagName("circle");
    var l = points.length;
    for (var i = 0; i < l; i++) {
        points[i].setAttribute("fill","none");
    }
    document.getElementById('rightOnTheEdge').innerHTML = "R";
    document.getElementById('topOnTheEdge').innerHTML = "R";
    document.getElementById('downOnTheEdge').innerHTML = ("-R");
    document.getElementById('leftOnTheEdge').innerHTML = ("-R");
    document.getElementById('rightMiddle').innerHTML = "R/2";
    document.getElementById('topMiddle').innerHTML = "R/2";
    document.getElementById('downMiddle').innerHTML = "-R/2";
    document.getElementById('leftMiddle').innerHTML = "-R/2";
}
function f() {
        var cx = xCurrent*120/rValue+150;
        var cy = -yCurrent*120/rValue+150;
        if(isNaN(cx)||isNaN(cy)){

        }else {draw(cx, cy);}
}

function removePoints() {
    document.getElementById("newPointForm:r").setAttribute("value","");
    var points = document.getElementsByTagName("circle");
    var l = points.length;
        for (var i = 0; i < l; i++) {
            var point = points[0];
            point.remove();
        }
}
