import express from 'express';
import { Server } from 'socket.io';
const PORT = 5050;

const app = express();
// app.listen(5050);
const httpServer = app.listen(PORT, () => {
    console.table(
        {
            'Controller:': 'http://localhost:5050/controller',
            'Display:': 'http://localhost:5050/display',
        }
    )
});
const ioServer = new Server(httpServer, { path: '/real-time' });

//const staticController = express.static('public-controller');
//const staticDisplay = express.static('public-display');

app.use('/controller', express.static('public-controller'));
app.use('/display', express.static('public-display'));
app.use(express.json());

/*___________________________________________

1) Create an endpoint to GET a validation message to test if the endpoint is working
_____________________________________________ */

//GET
app.get('/greetings', (request, response)=>{
    let message = {content: "Hello from server! 😎"}
    response.send(message);
});

//POST

app.post('/greetings', (request, response)=>{
    let {content} = request.body;
    console.log(content);
    response.end();
});

//PUT

//DELETE

app.post('/add-lead', (request, response) => {
    request.body //{name: 'David'}
    const bonnus = generateBonnus();
    response.send(bonnus);
});

/*___________________________________________

2) Create the socket methods to listen the events and emit a response
It should listen for directions and emit the incoming data.
_____________________________________________ */

ioServer.on('connection', (socket) => {
    console.log(socket.id);
    socket.on("instructions-controller", message =>{
        console.log(message);
        socket.broadcast.emit("instructions-display", message);
    });
    socket.on("directions-controller", directionController => {
        console.log(directionController);
        socket.broadcast.emit("directions-display", directionController);
    });
});

/*___________________________________________

3) Create an endpoint to POST user score and print it
_____________________________________________ */
