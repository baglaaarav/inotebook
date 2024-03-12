import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [cred, setCread] = useState({email: "", password: ""});
    let history = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email : cred.email, password : cred.password })
        });

        const json = await response.json();
        console.log(json);
        if(json.success === true){
            //save the authtoken and then redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
        }
        else{
            alert("Invalid cread");
        }
    }

    const onChange=(e)=>{
        setCread({...cred, [e.target.name] : e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  value={cred.password} onChange={onChange} name='password' id="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
