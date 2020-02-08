import React from "react";

import { AppHistory } from "src/routing/app-history";
import { AppRoutesPaths } from "src/routing/app-routes-path";

import "./header.scss";

export const PortalHeader = (): JSX.Element => (
    <header className="header">
        <div className="header-content">
            <span>E-TURNYRŲ ORGANIZAVIMO SISTEMA</span>
        </div>
        <div className="menu-head">
            <div className="menu-logo">
                <span>eorGG</span>
            </div>
            <div className="menu-bar">
                <button className="button" onClick={() => AppHistory.push(AppRoutesPaths.userPage)}>
                    useriai
                </button>
                <button className="button" onClick={() => AppHistory.push(AppRoutesPaths.tournamentPage)}>
                    tournamentai
                </button>
                {/* <button className="button" onClick={() => AppHistory.push(AppRoutesPaths.publicTeamPage)}>
                komandos
            </button> */}
                <button
                    className="button"
                    onClick={() => {
                        localStorage.removeItem("token");
                        AppHistory.push(AppRoutesPaths.loginPage);
                    }}
                >
                    logout
                </button>
            </div>
        </div>
    </header>
);
