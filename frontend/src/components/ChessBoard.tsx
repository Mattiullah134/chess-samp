import { Chess, Color, PieceSymbol, SQUARES, Square } from "chess.js";
import React, { useEffect, useState } from "react";

const ChessBoard = ({
  board,
  socket,
  chess,
  setBoard,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket | null;
  chess: any;
  setBoard: any;
}) => {
  console.log("board", board);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const toPos = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return (
    <div className="w-full">
      <div className=" rounded-md w-fit overflow-hidden">
        {board &&
          board.map((row, i) => {
            return (
              <div
                key={i}
                className="flex  justify-center items-center  w-fit z-20"
              >
                {row.map((square, j) => {
                  return (
                    <div
                      className={`w-16 text-center flex justify-center items-center cursor-pointer font-bold ${
                        square?.color === "b" ? "text-black" : "text-white"
                      }  h-16 ${
                        (i + j) % 2 === 0 ? "bg-[#779556]" : "bg-[#ebecd0]"
                      }`}
                      onClick={() => {
                        let pos = toPos[j] + (8 - i).toString();
                        console.log("pos ->", pos);
                        if (!from) {
                          setFrom(pos);
                        } else {
                          setTo(pos);
                          socket?.send(
                            JSON.stringify({
                              type: "MOVE",
                              move: { from, to: pos },
                            })
                          );
                          console.log("from", from, "to", pos);
                          try {
                            chess.move({ from, to: pos });
                            setFrom(null);
                          } catch (error) {
                            setFrom(null);
                            console.log("error in ove", error);
                          }
                          setBoard(chess.board());
                        }
                      }}
                    >
                      {square ? square.type.toUpperCase() : ""}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChessBoard;
