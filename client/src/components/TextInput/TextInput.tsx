import React from "react";

import "./TextInput.css";

type Props = {
  label?: string;
  placeholder?: string;
  onChange: (val: string | number) => void;
  type?: "text" | "Password";
};

const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  onChange,
  type = "text",
}) => {
  return (
    <div className="text-input">
      {Boolean(label) && <label htmlFor="">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};

export default TextInput;
