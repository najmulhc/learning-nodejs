const EventEmitter = require('events');

class BallEvent extends EventEmitter {
    constructor(){
        super();
    }
}
const ball = new BallEvent(); 

// the callback will execute once the kick event has emitted. 
ball.on("kick", () => {
    console.log('the ball was kicked');
});

ball.on('head', player => {
    console.log('the ball was headed by', player);
})

// the ball is emmiting an event called head. 
ball.emit('head', 'Christiano Ronaldo');

 