import React from "react";
interface ButtonInterface {
  title: string;
  onClick: () => void;
  className: string;
}
const Button = ({ title, onClick, className }: ButtonInterface) => {
  return (
    <button onClick={() => onClick()} className={className}>
      {title}
    </button>
  );
};

export default Button;
