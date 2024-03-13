import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [cred, setCread] = useState({email: "", password: ""});
    let history = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        
        const link =  `${process.env.REACT_APP_CONNECT_LINK}/api/auth/login`
        console.log(link)
        // console.log(link);
        const response = await fetch(link, {
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
            localStorage.setItem('token', json.authToken);
            history("/");
            props.showAlert("Account Logged in  Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
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
                    <input style={{color:"white", backgroundColor:"#888e99"}} type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input style={{color:"white", backgroundColor:"#888e99"}} type="password" className="form-control"  value={cred.password} onChange={onChange} name='password' id="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login