import React, { useContext } from "react";
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext, UserProvider } from './context/user';
import { Home } from './components/Home';
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import NavBar from "./components/Navbar";
import { MoviesProvider } from "./context/movies";
import { Logout } from "./components/Logout";

function App() {
  const {currentUser, setCurrentUser} = useContext(UserContext)

  return (
    <div className="App">

        <BrowserRouter>

          <NavBar />

          <Routes>
            <Route path="/" element={<MoviesProvider><Home /></MoviesProvider>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

        </BrowserRouter>
    </div>
  )
}

export default App;
