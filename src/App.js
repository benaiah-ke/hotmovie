import React, { useContext } from "react";
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext, UserProvider } from './context/user';
import { Home } from './components/Home';
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  const {currentUser, setCurrentUser} = useContext(UserContext)

  return (
    <div className="App">
      <header className="App-header">
        Hot Movie
      </header>

      <div>
        User: {currentUser ? currentUser.username : 'None'}
      </div>

        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
