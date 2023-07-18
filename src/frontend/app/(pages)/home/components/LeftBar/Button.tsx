import React from "react";

interface Props {
  children: React.ReactNode;
  text: string;
}

const Button = (props: Props) => {
  return (
    <button className="flex flex-row items-center gap-4">
      {props.children}
      <span className="text-2xl font-normal">{props.text}</span>
    </button>
  );
};

export default Button;
