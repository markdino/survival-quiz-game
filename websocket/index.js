import { createContext } from 'react';
import { SOCKET_URL } from '@utils/config';
import { io } from 'socket.io-client'

export const socket = io.connect(SOCKET_URL);
export const SocketContext = createContext();