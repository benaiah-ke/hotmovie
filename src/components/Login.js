import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import { URLS } from "../urls";

function Login(){
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })


    function updateUsername(evt){
        setFormData({...formData, username: evt.target.value});
    }

    function updatePassword(evt){
        setFormData({...formData, password: evt.target.value});
    }

    function handleSubmit(evt){
        evt.preventDefault();

        // Fetch user based on credentials
        fetch(URLS.users + `?username=${formData.username}&password=${formData.password}`)
            .then((response) => response.json())
            .then((users) => {
                if(users.length !== 0) {
                    setCurrentUser(users[0])
                }else{
                    alert("User not found")
                }
            })
            .catch((error) => {
                console.log(error)
                alert('Invalid username or password')
            })
    }

    // If a user is logged in, redirect to dashboard
    if(currentUser !== null){
        return (
            <Navigate to="/" />
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input value={formData.username} onChange={updateUsername} required />
                <br/><br/>

                <label>Password:</label>
                <input value={formData.password} onChange={updatePassword} required />
                <br/><br/>

                <button>Log In</button>

                <Link to="/signup">Create Account</Link>
            </form>
        </div>
    )
}

export { Login }
