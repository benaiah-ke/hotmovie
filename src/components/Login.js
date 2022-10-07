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
        <div className="container py-5">
            <div className="row">

                <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5 mx-auto">

                    <h5 className="text-center mb-4">Log In</h5>

                    <div className="card">
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-4">
                                    <label>Username:</label>
                                    <input value={formData.username} onChange={updateUsername} className="form-control" required />
                                </div>

                                <div className="form-group mb-4">
                                    <label>Password:</label>
                                    <input type="password" value={formData.password} onChange={updatePassword} className="form-control" required />
                                </div>

                                <button className="btn btn-block btn-success mb-4">Log In</button>

                                <div className="text-center">
                                    Not registered? <Link to="/signup">Create Account</Link>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export { Login }
