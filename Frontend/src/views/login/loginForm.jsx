import React, { useEffect, useState, } from "react";
import { Navigate } from "react-router-dom";
import "./login.css"


const LoginForm = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [navigate, setNavigate] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const getLogin = async () => {
      try {
        let response = await fetch(
          "login", {
          method: "POST",
          body: JSON.stringify(login),
          headers: {
            "Content-type": "application/json"
          }
        }
        )
        if (response.ok) {
          setlogin({
            email: "",
            password: "",
          },
          )
          setNavigate(true);
        } else {
          throw new Error("error")
        }
      } catch (error) {
        console.log(error)
      }
    }
    getLogin();
  };
  if (navigate) {
    return <Navigate to="/home" />
  }
    return (
      <form onSubmit={handleSubmit} className="frm">
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={login.email}
            onChange={(e) => setlogin({ ...login, email: e.target.value, })}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={login.password}
            onChange={(e) => setlogin({ ...login, password: e.target.value, })}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Submit</button>
          <br />
          <button className="btn btn-primary">Logout</button>
        </div>
        <p className="forgot-password text-right">
          Forgot password?
        </p>
        <p className="forgot-password text-right">
          Already not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    )

}
export default LoginForm
