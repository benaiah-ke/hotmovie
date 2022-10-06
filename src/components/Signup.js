import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import { URLS } from "../urls";

function Signup(){
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

        // Save user
        fetch(URLS.users, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((user) => {
                setCurrentUser(user)
                setFormData({
                    username: '',
                    password: ''
                })
            })
            .catch((error) => {
                console.log(error)
                alert('Oops')
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
                <label>New Username:</label>
                <input value={formData.username} onChange={updateUsername} required />
                <br/><br/>

                <label>Set Password:</label>
                <input value={formData.password} onChange={updatePassword} required />
                <br/><br/>

                <button>Create Account</button>

                <Link to="/login">Log in</Link>
            </form>
        </div>
    )
}

export { Signup }
