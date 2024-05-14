import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

const SignUpForm = () => {
  const navigate = useNavigate()
  const [signUp, setSignup] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
  },[]);
  const getSignUp = async (e) => {
    
      try {
        let response = await fetch(
          "register", {
          method: "POST",
          body: JSON.stringify(signUp),
          headers: {
            "Content-type": "application/json"
          },
        }
        )
        if (response.ok) {
          alert("message: Account created successfully")
          setSignup({
            name: "",
            lastName: "",
            email: "",
            password: "",
          })
        } else {
          throw new Error("error")
        }
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <form onSubmit={getSignUp}className="frm">
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={signUp.name}
            onChange={(e) => setSignup({...signUp, name: e.target.value, })}/>
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            value={signUp.lastName}
            onChange={(e) => setSignup({...signUp, lastName: e.target.value,})}/>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={signUp.email}
            onChange={(e) => setSignup({ ...signUp, email: e.target.value, })}/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={signUp.password}
            onChange={(e) => setSignup({ ...signUp, password: e.target.value, })}/>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary">
            Sign Up
            </button>

        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/">Sign in</a>
        </p>
      </form>
    )
}
export default SignUpForm;
