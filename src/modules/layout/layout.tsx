import React from "react";

import "./layout.scss";

interface Props {
    header: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
}

export const Layout: React.FC<Props> = ({header, children, footer}) => (
    <div className="layout">
        {header}
        <div className="main-content">
            {children}
        </div>
        {footer}
    </div>
);
