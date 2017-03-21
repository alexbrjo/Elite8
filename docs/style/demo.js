var i = 0;
function demo () {
    i++;
        $("#alu").prepend("<div>A = A + B = "+i+"</div>");
        $("#alu div").first().fadeOut(1000);
    setTimeout(demo, 
    Math.random()*500);
}
demo();
