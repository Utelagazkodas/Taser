import { SerialPort } from 'serialport';

/* var stdin = process.stdin;
// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
       
// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', (key) => {
    if(key.toString() === " "){
        turnOn()
    }
    else {
        process.exit()
    }
}); */



const path = '/dev/ttyUSB1';
const server = "ws://localhost:443"

const serialPort = new SerialPort({ path: path, baudRate: 9600 });
const webSocket = new WebSocket(server)

webSocket.addEventListener("message", ()=>{turnOn()})

serialPort.on('open', () => {
    console.log('Serial port opened');
});

serialPort.on('error', (err) => {
    console.error('Error opening serial port:', err);
});




function turnOn() {
    
    if (serialPort.isOpen) {
        serialPort.write("1", (err) => {
            if (err) {
                console.error('Error writing to serial port:', err);
            } else {
                console.log('Data sent successfully');
                //serialPort.close(); // Close the port after sending the data
            }
        });
    }

}