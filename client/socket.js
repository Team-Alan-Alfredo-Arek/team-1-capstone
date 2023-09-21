import socketIoClient from "socket.io-client";

const ENDPOINT = process.env.SOCKET || "http://localhost:3000";

const socket = socketIoClient(ENDPOINT);
export default socket;
