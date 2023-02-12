import React from "react";

import "./Button.css";

type ButtonProps = {
  label: string;
  variant?: "primary" | "outlined-primary" | "outlined-secondary";
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button button__${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;
