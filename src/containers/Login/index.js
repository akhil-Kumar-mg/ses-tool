import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import './style.scss';
import useNotify from "../../actions/Toast";
import logo from '../../assets/img/ses-logo.png';

function Login() {
    const history = useHistory();
    const { notify } = useNotify();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


const onLogin = () =>{

if(username === "admin" && password==="password"){

    history.push(`/App`);
}else{
    notify("Incorrect username/password", "error");
}

}


  return <div className="login-container container">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key">
                <img src={logo} alt="ses ovp master tool" />
                </div>

                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label">USERNAME</label>
                                <input type="text" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control"  value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">

                                </div>
                                <div className="col-lg-6 login-btm login-button">
                                    <button type="button" className="btn btn-secondary" onClick={onLogin}>LOGIN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div></div>;
  
}

export default Login;