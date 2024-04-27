import React, { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import Button from "../components/Button";
import useScoket from "../hooks/useSocket";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
const INIT_GAME = "INIT_GAME";
const MOVE = "MOVE";

const GAME_OVER = "GAME_OVER";

export const Game = () => {
  const socket = useScoket();
  const [chess, setChess] = useState<Chess>(new Chess());
  const [board, setBoard] =
    useState<
      ({ square: Square; type: PieceSymbol; color: Color } | null)[][]
    >();
  const [name, setName] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [turn, setTurn] = useState("");
  const handlePlay = async () => {
    socket?.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
  };
  useEffect(() => {
    if (!socket) {
      return;
    } else {
      socket.onmessage = (e) => {
        console.log("e", JSON.parse(e.data));
        let message = JSON.parse(e.data);
        console.log("message", message);

        switch (message.type) {
          case INIT_GAME:
            console.log("initialize the game");
            setIsStart(true);
            // setChess(new Chess());
            setName(message.payload.color);
            setTurn(chess.turn());
            setBoard(chess.board());

            break;
          case MOVE:
            const move = message.payload;
            // console.log("move", move);
            console.log("turn ", chess?.turn());
            console.log("move aii", move);

            chess?.move(move);
            console.log("chess board", chess?.board());

            setBoard(chess?.board());
            console.log("move the game");
            break;
          case GAME_OVER:
            console.log("game over");
            break;

          default:
            break;
        }
      };
    }
  }, [socket]);
  return (
    <div className="flex justify-center w-full mt-5">
      <div className=" w-full max-w-screen-lg">
        <div className="grid grid-cols-12 w-full ">
          <div className="w-full  col-span-8">
            {chess && board ? (
              <ChessBoard
                chess={chess}
                setBoard={setBoard}
                socket={socket}
                board={board}
              />
            ) : (
              <div>
                <img
                  src="https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png"
                  className="w-2/3 h-w-2/3 rounded-md"
                />
              </div>
            )}
          </div>
          <div>
            {!isStart ? (
              <Button
                title="Play"
                onClick={() => handlePlay()}
                className="bg-[#80b54c] w-32"
              />
            ) : (
              <div className="flex flex-col">
                <p className="text-white">
                  {chess.turn() === name[0] ? "Your turn" : "opponet turn"}
                </p>
                <p className="text-white">{name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
