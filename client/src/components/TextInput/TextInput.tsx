import React from "react";

import "./TextInput.css";

type Props = {
  label?: string;
  placeholder?: string;
  onChange: (val: string | number) => void;
  type?: "text" | "password";
  value: string;
  style?: {};
};

const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  onChange,
  type = "text",
  value,
  style,
}) => {
  return (
    <div className="text-input" style={style}>
      {Boolean(label) && <label htmlFor="">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};

export default TextInput;
