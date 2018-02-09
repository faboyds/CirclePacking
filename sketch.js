var circles = [];
var canvasWidth = 710;
var canvasHeight = 427;
var strokeW = 2;
var img;
var spots = [];

function preload() {
    img = loadImage('data/go.png');
}

function setup() {
    img.loadPixels();

    /*
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            var index = x + (y * img.width);
            var c = img.pixels[index*4];

            if(c === 255){
                spots.push({x: x, y: y});
            }
        }
    }
    */

    canvasWidth = img.width;
    canvasHeight = img.height;
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(0);

    var total = 20;
    var count = 0;
    var attempts = 0;

    while(count < total){
        if(createCircle()) count ++;

        attempts++;

        if(attempts > 1000) break;
    }
    circles.map(
        function(circle){
            if(circle.growing) {
                if (circle.touchingEdges() || circle.overlappingOtherCircle(circles)) {
                    circle.stopGrow();
                }
            }

            circle.show();
            circle.grow();
        });

}

function createCircle() {

    //var r = floor(random(0, spots.length));
    //var spot = spots[r];
    //var x = spot.x;
    //var y = spot.y;

    var x = floor(random(canvasWidth));
    var y = floor(random(canvasHeight));

    for(var i = 0; i < circles.length; i++) {
        var circle = circles[i];

        var d = dist(circle.x, circle.y, x, y);

        if (d < circle.radius) {
            return false;
        }
    }


    var index = x + (y * img.width);
    var r = img.pixels[index*4];
    var g = img.pixels[index*4 + 1];
    var b = img.pixels[index*4 + 2];
    var a = img.pixels[index*4 + 3];

    circles.push(new Circle(x, y, r, g, b, a));
    return true;
}

function Circle(x, y, r, g, b, a) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.radius = 1;
    this.growing = true;

    this.show = function(){
        //stroke(255);
        //strokeWeight(strokeW);
        //noFill();
        fill(this.r, this.g, this.b, this.a);
        ellipse(this.x, this.y, this.radius*2, this.radius*2);
    };

    this.grow = function(){
        if(this.growing) this.radius+=0.5;
    };


    this.stopGrow = function(){
        this.growing = false;
    };
    
    this.touchingEdges = function () {
        return this.x + this.radius > canvasWidth || this.y + this.radius > canvasHeight
            || this.x - this.radius < 0  || this.y - this.radius < 0;
    };

    this.overlappingOtherCircle = function (circles) {

        for(var i = 0; i < circles.length; i++){
            var other = circles[i];

            if(other !== this) {
                var d = dist(this.x, this.y, other.x, other.y);

                if(d < this.radius + other.radius + strokeW){
                    return true;
                }
            }
        }

        return false;
    }
}