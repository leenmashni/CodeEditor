import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function CreateAccount() {
    const history=useNavigate();

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/CreateAccount",{
                username,password
            })
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data==="notexist"){
                    history("/Home",{state:{id:username}})
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
            {/* Create Account Form */}
            <div className="col-md-4">
              <div className="card shadow-lg p-4 bg-dark rounded">
                <h2 className="text-light text-center mb-4">Create Account</h2>
    
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
                    Create Account
                  </button>
    
                  <p className="mt-3 text-light text-center">
                    Already have an account?{" "}
                    <a href="/" className="text-success">
                      Login
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      ); 
}

export default CreateAccount;
