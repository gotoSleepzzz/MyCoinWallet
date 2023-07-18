import { Server } from 'socket.io';
import { io as IOClient, Socket } from 'socket.io-client';

const peers: Array<string> = [];

const Peer2Socket = new Map<string, Socket>();
const

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

const addPeer = (peer: string) => {
    const ioClient = IOClient(peer);
    Peer2Socket.set(peer, ioClient);
    peers.push(peer);

    console.log('connecting to peer: ' + peer);
    ioClient.on('connection', () => {
        console.log('connected to peer: ' + peer);
        Peer2Socket.set(peer, ioClient);
    });
    ioClient.on('disconnect', () => {
        console.log('disconnected from peer: ' + peer);
        Peer2Socket.delete(peer);
        if (peers.indexOf(peer) !== -1) {
            peers.splice(peers.indexOf(peer), 1);
        }
    });
    ioClient.on('message', (message: Message) => {
        console.log('received message: ' + JSON.stringify(message));
        switch (message.type) {
        }
    });
}
var temp: any;
const initP2PServer = (httpServer: any, hostPort: number) => {
    const SelfUrl = `http://localhost:${hostPort}`;
    const io = new Server(httpServer);
    // self socket.io
    io.on('connection', (socket: any) => {
        console.log('connected to peer: ' + socket.id);
        socket.on('disconnect', () => {
            console.log('disconnected from peer: ' + socket.id);
        });

        socket.on('message', (message: Message) => {
            console.log('received message: ' + JSON.stringify(message));
        });
    });


    // socket.io for peer to peer
    const ioPeer = IOClient(process.env.SOCKET_ENV as string);

    ioPeer.on('addPeer', (newPeers: Array<String>) => {
        newPeers.forEach((peer: any) => {
            if (peers.indexOf(peer) === -1 && peer !== SelfUrl) {
                addPeer(peer)
            }
        });
    });

    ioPeer.on('removePeer', (peer: string) => {
        const index = peers.indexOf(peer);
        if (index !== -1) {
            peers.splice(index, 1);
            Peer2Socket.delete(peer);
        }
    });

    ioPeer.emit('newPeer', `http://localhost:${hostPort}`);
}

export { initP2PServer };