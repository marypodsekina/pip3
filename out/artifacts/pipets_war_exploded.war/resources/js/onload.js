function startTime() {
    var tm=new Date();
    var h=tm.getHours();
    var m=tm.getMinutes();
    var s=tm.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById("watch").innerText=h+":"+m+":"+s;
    var t=setTimeout('startTime()',11000);
}
function checkTime(i){
    if (i<10)
    {
        i="0" + i;
    }
    return i;
}
window.onload = function () {
    startTime();
};