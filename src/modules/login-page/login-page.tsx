import React, { useState, useEffect } from "react";
import Axios from "axios";
import { AppHistory } from "src/routing/app-history";
import { AppRoutesPaths } from "src/routing/app-routes-path";

async function postRequest(username: string, password: string): Promise<void> {
    // console.log(username);
    await Axios({
        method: "POST",
        url: "https://localhost:44346/api/jwt",
        data: {
            username: username,
            password: password
        }
    }).then(response => {
        // console.log(username, password);
        if (response.status === 200) {
            localStorage.setItem("token", response.data);
            AppHistory.push(AppRoutesPaths.landingPage);
        }
    });
}

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            AppHistory.push(AppRoutesPaths.landingPage);
        }
    });

    return (
        <div className="login-view">
            <div className="login-wrapper">
                <div className="input name-wrapper">
                    <span>Vardas</span>
                    <div>
                        <input className="login-input" onChange={event => setUsername(event.target.value)} />
                    </div>
                </div>
                <div className="input pass-wrapper">
                    <span>Slaptažodis</span>
                    <div className="password-input">
                        <input
                            className="login-input"
                            type={!showPassword ? "password" : "text"}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <i
                            className={`far ${showPassword ? `fa-eye-slash` : `fa-eye`} eye-visibility`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button className="button" onClick={() => postRequest(username, password)}>
                        Prisijungti
                    </button>
                </div>
            </div>
        </div>
    );
};
