const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });

function setup() {
    frameRate(16);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    ellipse(windowWidth / 2, windowHeight / 3, 50, 50);
    ellipse(windowWidth / 2, windowHeight / 1.5, 50, 50);
    ellipse(windowWidth / 1.5, windowHeight / 2, 50, 50);
    ellipse(windowWidth / 3, windowHeight / 2, 50, 50);

    movementButton('UP', windowWidth / 2, windowHeight / 3);
    movementButton('DOWN', windowWidth / 2, windowHeight / 1.5);
    movementButton('RIGHT', windowWidth / 1.5, windowHeight / 2);
    movementButton('LEFT', windowWidth / 3, windowHeight / 2);
}
let message = {greetings: 'Hola',
                    screen: 0};


function mouseClicked(){
    
    socket.emit('instructions-controller', message);
    message.screen++;

}

/*___________________________________________

1) Create a function that includes the socket method to emit the directions
_____________________________________________ */
let directionController= "";

function movementButton(direction, posX, posY) {
    //switch case UP, DOWN, RIGHT, LEFT
    if(dist(pmouseX, pmouseY, posX, posY)<25){
        console.log(`Hello from button ${direction}!`);
        directionController = direction;
        socket.emit("directions-controller", directionController);
    }
   
}