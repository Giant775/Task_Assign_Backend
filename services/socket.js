import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:5173',
            credentials: true,
            methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PATCH']
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        })
    })

    return io;
};

export const getIO = () => {
    if(!io) {
        throw new Error('Socket.io ont initialized');
    }
    return io;
} ;