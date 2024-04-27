import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

// interface Game {
//   id: number;
//   name: string;
//   player: WebSocket[];
// }
export class GameManager {
  private game: Game[] = [];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];
  constructor() {
    this.game = [];
    this.pendingUser = null;
    this.users = [];
  }
  addUser(socket: WebSocket) {
    if (!this.users.includes(socket)) {
      this.users.push(socket);
      console.log("add the user");
      this.addHandler(socket);
    } else {
      return;
    }
  }
  removeUser(socket: WebSocket) {
    this.users.filter((user) => user != socket);
    console.log("remove the user");
  }
  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      console.log("data", data.toString());

      const message = JSON.parse(data.toString());
      console.log("message", message, message.type);

      if (message.type === INIT_GAME) {
        if (this.pendingUser && socket !== this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.game.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      } else if (message.type === MOVE) {
        let game = this.game.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        console.log("game", game);

        if (game) {
          console.log("make a move");

          game.makeMove(socket, message.move);
        }
      }
    });
  }
}
