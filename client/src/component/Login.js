import React, { useState } from 'react';
//import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
//import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history=useNavigate();

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8080/",{
                username,password
            })
            .then(res=>{
                if(res.data==="exist"){
                    history("/Home",{state:{id:username}})
                }
                else if(res.data==="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

    return (
        <div className="container-fluid">
          <div className="row min-vh-100 d-flex justify-content-center align-items-center">
            {/* Login Form */}
            <div className="col-md-4">
              <div className="card shadow-lg p-4 bg-dark rounded">
                <h2 className="text-light text-center mb-4">Login</h2>
    
                <form onSubmit={submit}>
                  <div className="form-group mb-3">
                    <label className="text-light">Username:</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
    
                  <div className="form-group mb-4">
                    <label className="text-light">Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
    
                  <button type="submit" className="btn btn-primary btn-lg btn-block">
                    Login
                  </button>
    
                  <p className="mt-3 text-light text-center">
                    Don't have an account?{" "}
                    <a href="/CreateAccount" className="text-success">
                      Create Account
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}
export default Login;

