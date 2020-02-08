import React from "react";
import jwt_decode from "jwt-decode";

import { UserJwtDto } from "../dataType";

export const LandingPage: React.FC = () => {
    let decoded: UserJwtDto | undefined;
    const token = localStorage.getItem("token");
    if (token != null) {
        decoded = jwt_decode(token);
        localStorage.setItem("role", decoded!.role);
    }

    return (
        <>
            <div>
                <span>WELCOME TO FACEIT 2.0</span>
            </div>
            <div>
                <img className="lekavicius" src={"https://miro.medium.com/max/8480/1*WqTXyhs2TKgXjq19AigIbg.jpeg"}></img>
            </div>
        </>
    );
};
