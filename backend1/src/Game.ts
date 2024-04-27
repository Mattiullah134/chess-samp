import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, INVALID_MOVE, MOVE } from "./messages";
const appId = process.env.APPID;
export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;

  private startTime: Date;
  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
          turn: this.board.turn(),
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
          turn: this.board.turn(),
        },
      })
    );
  }
  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    //   this means => this is the turn of the player1 but player 2 make a move

    if (this.board.turn() === "w" && socket !== this.player1) {
      console.log("return because palyer 1 tern");
      return;
    }
    if (this.board.turn() === "b" && socket !== this.player2) {
      console.log("return because palyer 2 tern");
      return;
    }
    try {
      console.log("push the move", move, this.board.moves().length);

      this.board.move(move);
      // if the move is valid call the db and add the entry to the database
    } catch (error) {
      console.log("error in move", error);
      this.player1.send(
        JSON.stringify({
          type: INVALID_MOVE,
          payload: {
            move,
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: INVALID_MOVE,
          payload: {
            winner: move,
          },
        })
      );
      return;
    }
    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "b" ? "White" : "Black",
          },
        })
      );
    }
    console.log("turn", this.board.turn());

    if (this.board.turn() === "w") {
      console.log("player 1 send");
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
    console.log(this.board.moves().length % 2);
    if (this.board.turn() === "b") {
      console.log("player 2 send");
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }

    console.log("board", this.board.board());
  }
  getBoard() {
    return this.board;
  }
}
