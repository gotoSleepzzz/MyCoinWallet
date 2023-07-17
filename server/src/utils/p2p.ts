import {Server} from 'socket.io';

enum MessageType {
    QUERY_LATEST = 0,
    QUERY_ALL = 1,
    RESPONSE_BLOCKCHAIN = 2,
    QUERY_TRANSACTION_POOL = 3,
    RESPONSE_TRANSACTION_POOL = 4
}

class Message {
    public type: MessageType;
    public data: any;
}

const initP2PServer = (httpServer: any, p2pPort: number) => { 
    const io = new Server(httpServer);
    io.on('connection', (socket: any) => {
        socket.join('network');
    });
}

export { initP2PServer };