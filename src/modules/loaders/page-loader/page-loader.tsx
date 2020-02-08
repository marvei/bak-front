import React from "react";

import { SpinnerLoader } from "../spinner-loader/spinner-loader";

import "./page-loader.scss";

export const PageLoader = () =>
    (
        <div className="page-loader">
            <SpinnerLoader />
        </div>
    );
