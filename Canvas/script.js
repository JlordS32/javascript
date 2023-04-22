window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    let painting = false;

    function startPosition(){
        painting = true;
        draw(e);
    };

    function endPosition(){
        painting = false;
        context.beginPath();
    };

    function draw(e){
        if(!painting) return;

        context.lineWidth = 10;
        context.lineCap = "round";
        context.strokeStyle = "blue";

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    };

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
});

/*
context2.strokeStyle = "green";
context2.lineWidth = 4;
context2.strokeRect(300, 300, 100, 200);

context.strokeStyle = "red";
context.lineWidth = 2;
context.strokeRect(100, 100, 100, 200);


context.strokeStyle = "blue";
context.strokeRect(150, 200, 100, 200);
*/
