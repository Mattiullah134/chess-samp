import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/game");
  };
  return (
    <div className="flex flex-col gap-10 p-10 md:justify-center md:flex-row">
      <div>
        <img
          src="https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png"
          className="w-96 h-96 rounded-md"
        />
      </div>
      <div className="flex flex-col ">
        <div className="mb-6">
          <h1 className="text-4xl text-center font-bold text-white">
            Play Chess Online on the #1 Site!
          </h1>
        </div>
        <div className="flex justify-center">
          <Button
            title="Play Game"
            onClick={() => handleNavigate()}
            className="bg-[#80b54c]"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
