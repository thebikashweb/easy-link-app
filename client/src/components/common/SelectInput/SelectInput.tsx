import React from "react";
import "./SelectInput.css";

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  label?: string;
  options: Option[];
  onChange: (val: string | number) => void;
  value: string | number;
  style?: React.CSSProperties;
};

const SelectInput: React.FC<Props> = ({
  label,
  options,
  onChange,
  value,
  style,
}) => {
  return (
    <div className="select-input" style={style}>
      {Boolean(label) && <label htmlFor="">{label}</label>}
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
