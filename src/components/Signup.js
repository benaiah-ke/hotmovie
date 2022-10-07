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
        <div className="container py-5">
            <div className="row">

                <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5 mx-auto">

                    <h5 className="text-center mb-4">Create Account</h5>

                    <div className="card">
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-4">
                                    <label>Your Username:</label>
                                    <input value={formData.username} onChange={updateUsername} className="form-control" required />
                                </div>

                                <div className="form-group mb-4">
                                    <label>Set Password:</label>
                                    <input type="password" value={formData.password} onChange={updatePassword} className="form-control" required />
                                </div>

                                <button className="btn btn-block btn-success mb-4">Submit</button>

                                <div className="text-center">
                                    Have an account? <Link to="/login">Log In</Link>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export { Signup }
