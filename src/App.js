import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <ToastContainer />
            <Router />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;