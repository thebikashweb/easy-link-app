import React from "react";

import "./urlTable.css";

// Define an interface for column
interface Column {
  label: string;
  field: string;
  hideLabelinMobile?: boolean;
}
// Define an interface for row
interface Row {
  [key: string]: any; // The data object for this row
}
// Define an interface for props
interface Props {
  columns: Column[]; // An array of columns
  rows: Row[]; // An array of rows
}
const UrlTable: React.FC<Props> = ({ columns, rows }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 769);

  React.useEffect(() => {
    const handleWindowSize = (e: UIEvent) => {
      const w = e.target as Window;
      if (w.innerWidth <= 769) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  });

  const renderDesktopView = () => {
    return (
      <table className="main-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={row.id + column.field}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const renderMobileView = () => {
    return (
      <table className="main-table mobile-table">
        {rows.map((row) => (
          <thead key={row.id}>
            {columns.map((column) => (
              <tr key={row.id + column.field}>
                {!column.hideLabelinMobile && <h3>{column.label}:</h3>}
                {row[column.field]}
              </tr>
            ))}
          </thead>
        ))}
      </table>
    );
  };

  return <>{isMobile ? renderMobileView() : renderDesktopView()}</>;
};

export default UrlTable;
