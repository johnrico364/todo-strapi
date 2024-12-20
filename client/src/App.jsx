import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Add } from "./pages/Add";
import { Update } from "./pages/Update";
import { createContext} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppContext = createContext();

function App() {
  const client = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update" element={<Update />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
