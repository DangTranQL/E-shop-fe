import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;