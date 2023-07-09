import * as WebSocket from 'ws';
import {Server} from 'ws';

const sockets: WebSocket[] = [];

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