import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const [cred, setCread] = useState({ name: "", email: "", password: "" });
  let history = useNavigate();



  const handleClick = async (e) => {
    e.preventDefault();

    const { name, password, email } = cred;
    const link =  `${process.env.REACT_APP_CONNECT_LINK}/api/auth/createuser`
    
    const response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    });

    const json = await response.json();
    console.log(json);
    //save the authtoken and then redirect
    if(json.success === true){
      //save the authtoken and then redirect
      localStorage.setItem('token', json.authtoken);

      history("/login");
      props.showAlert("Account Created Successfully", "success")
  }
  else{
    props.showAlert("Invalid Credentials", "danger")
  }

  }

  const onChange = (e) => {
    setCread({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input style={{color:"white", backgroundColor:"#888e99"}} type="text" className="form-control"  minLength={5} onChange={onChange} id="name" name='name' required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input style={{color:"white", backgroundColor:"#888e99"}} type="email" className="form-control" onChange={onChange} id="email" required name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input style={{color:"white", backgroundColor:"#888e99"}} type="password" className="form-control" onChange={onChange} minLength={5} name='password'required id="password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup;