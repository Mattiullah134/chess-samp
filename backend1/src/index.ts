import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
const APPID = Number(process.env.APPID) || 8081;

const wss = new WebSocketServer({ port: APPID });
const gameManager = new GameManager();
interface MessageType {
  type: string;
  room: string;
  participant1: string;
  participant2: string;
  state: string[];
  move: string[];
}
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  gameManager.addUser(ws);
  ws.on("close", (code) => {
    gameManager.removeUser(ws);
  });
});
