console.log("hello world! i'm a fish (for now).")

//set points
var points = 0;

// set and change canvas size on resize
const ocean = document.getElementById('ocean');
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

function changeWindowSize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    setOcean(ocean, windowWidth, windowHeight);
}

window.addEventListener('resize', changeWindowSize);

// set ocean size and context
function setOcean(o, w, h){
    o.style.width = w;
    o.style.height = h;
    const ctx = o.getContext('2d');
    return ctx;
}
const context = setOcean(ocean, windowWidth, windowHeight);

// clear canvas function
function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ocean.width, ocean.height);
}

// bubble class
class Bubble {
    static list = [];
    static max = 10000;

    static generateBubbles() {
        if (Bubble.list.length < Bubble.max){
            const newX = 0-250;
            const newY = Math.random()*(ocean.height+1);
            const newRadiusX = (Math.random()*101)+100;
            const newRadiusY = newRadiusX/2;
            const newStartAngle = 0;
            const newEndAngle = 2 * Math.PI;
            const newClockwise = false;
            var newSpeed = 1.5;
            var newColor = 'blue';
            var newButton = false;

            // set variable speed
            const styleNum = Math.floor(Math.random()*3);
            if (styleNum == 0){
                // slow speed
                newSpeed = 0.5;
            }
            else if (styleNum == 1){
                // mid speed
                newSpeed = 1;
            }

            // set variable color
            const newNum = Math.floor(Math.random()*5)
            if (newNum == 0){
                // light
                newColor = '#C2FCF7';
            }
            else if (newNum == 1){
                // mid1
                newColor = '#449DD1';
            }
            else if (newNum == 2){
                // mid2
                newColor = '#38369A';
            }
            else {
                // dark
                newColor = '#0E0E52';
            }
            new Bubble(newX, newY, newRadiusX, newRadiusY, newStartAngle, newEndAngle, newClockwise, newSpeed, newColor, newButton);
        }
    };
    static updateBubbles() {
        Bubble.list.forEach((b) => b.update());
    };
    static drawBubbles() {
        Bubble.list.forEach((b) => b.draw());
    };

    constructor (X, Y, radiusX, radiusY, startAngle, endAngle, clockwise, speed, color, button){
        this.X = X;
        this.Y = Y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.clockwise = clockwise;
        this.speed = speed;
        this.color = color;
        this.button = button;
        Bubble.list.push(this);
    };
    draw() {
        context.beginPath();
        context.ellipse(this.X, this.Y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.clockwise);
        context.fillStyle = this.color;
        context.fill();
    };
    update() {
        this.X += this.speed;
        if (this.X > ocean.width + 250){
            this.X = 0-250;
        }
    }
}

// loop everything
function loop() {
    clearCanvas(context);
    Bubble.generateBubbles();
    Bubble.updateBubbles();
    Bubble.drawBubbles();
    requestAnimationFrame(loop);
}

loop();

// button controls
function changeButton() {
    const button = document.getElementById("switchButton");
    const container = document.getElementById("container");
    const otherButtons = document.getElementsByTagName("button");
    if (button.value == "I wanna be a whale!"){
        console.log("changing to whale...")
        button.value = "I wanna be a fish!";
        button.setAttribute("class", "whaleButton");
        container.setAttribute("class", "whale");
        for (let i=0; i<otherButtons.length; i++){
            otherButtons[i].setAttribute("class", "whale")
        }
    }
    else {
        console.log("changing to fish...")
        button.value = "I wanna be a whale!"
        button.setAttribute("class", "fish");
        container.setAttribute("class", "fish");
        for (let i=0; i<otherButtons.length; i++){
            otherButtons[i].setAttribute("class", "fish")
        }
    }
}
