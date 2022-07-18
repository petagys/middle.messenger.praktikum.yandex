type MyWebSocket = {
    socket: null | WebSocket;
    set: (userId: number, actionId: number, token: string) => WebSocket;
    get: () => WebSocket | null;
}

export const mySocket:MyWebSocket = {
    socket: null,
    set(userId:number, actionId:number, token:string):WebSocket {
        if (this.socket !== null) {
            this.socket.close();
            this.socket = null;
        }
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${actionId}/${token}`);
        return this.socket;
    },
    get() {
        return this.socket;
    },
};
