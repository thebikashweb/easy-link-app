import React from "react";
import "./App.css";
import MainRoutes from "./Routes";
import Appbar from "./components/Appbar/Appbar";
import SnackBar from "./components/common/Snackbar/SnackBar";

function App() {
  return (
    <div className="app">
      <SnackBar />
      {/** Appbar  */}
      <Appbar />

      {/** All inner Dashboard page */}
      <MainRoutes />
    </div>
  );
}

export default App;
