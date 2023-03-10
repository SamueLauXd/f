const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });
//let socket = null;
let displayScreen = 0;
let displayDirection = "";
let greetings = "";
let character = {
    x: 0,
    y: 0
};
let whiteMouse = {
    x: 50,
    y: 50
};
let speed = 2;


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    character.x = windowWidth / 2;
    character.y = windowHeight / 2;

    fetch('http://localhost:5050/greetings')
    .then(response => response.json())
    .then(data => {
        let {content} = data;
        greetings = content;
        console.log(greetings)});

}

function draw() {
    //console.log(screen);
    switch(displayScreen){
        case 0:
            console.log("displayScreen: Inicio");
        break;
        case 1:
            console.log("displayScreen: Juego");
            //socket == null ? socket = io(URL, { path: '/real-time' }) : socket;
        break;
        case 2:
            console.log("displayScreen: Results");
        break;
        case 3:
            console.log("displayScreen: Form");
        break;
    }

    switch(displayDirection){
        case 'UP':
            character.y-=speed;
   
        break;
        case 'DOWN':
            character.y+=speed;
        break;
        case 'LEFT':
            character.x-=speed;
        break;
        case 'RIGHT':
            character.x+=speed;
        break;
        default:
            character.x = character.x;
            character.y = character.y;
        break;
    }

    background(0, 50);
    textSize(64);
    text('🐍', character.x - 25, character.y);
    textSize(24);
    fill(255);
    text(greetings, character.x - 25, character.y);
    textSize(24);
    text('🐁', whiteMouse.x, whiteMouse.y);
    eatsMouse();
}


function eatsMouse() {
    if (dist(character.x, character.y, whiteMouse.x, whiteMouse.y) < 50) {
        putMouseRandomPosition();
    }
}

function putMouseRandomPosition() {
    whiteMouse.x = random(50, windowWidth - 50);
    whiteMouse.y = random(50, windowHeight - 50);
}

function mouseClicked(){
    //socket == null ? socket = io(URL, { path: '/real-time' }) : socket;
    sendGreetings();
    screen++;
}
//-------------------------------------------

async function sendGreetings(){
    let message = {content: "Greetings from client 🐍"};
    let request = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(message)
    }
    console.log('Sent!');
    fetch('http://localhost:5050/greetings',request);
}


/*___________________________________________

1) Include the socket method to listen to events and change the character position.
You may want to use a Switch structure to listen for up, down, right and left cases.
_____________________________________________ */

socket.on("instructions-display", message =>{
    //console.log(message);
    let {screen} = message;
    displayScreen = screen;
});

socket.on("directions-display", message =>{
    
    displayDirection = message;
    console.log(displayDirection);
});

/*___________________________________________

2) Include the fetch method to post each time the snake eats a mouse
_____________________________________________ */

