import React from "react";
import { Layout } from "./layout";
import { Footer } from "./footer/footer";
import { AppHistory } from "src/routing/app-history";
import { AppRoutesPaths } from "src/routing/app-routes-path";
import { PortalHeader } from "./header/portal-header";

interface Props {
    children: React.ReactNode;
}

export const PortalLayout = (props: Props): JSX.Element => {
    const token = localStorage.getItem("token");
    if (token == null) {
        AppHistory.push(AppRoutesPaths.loginPage);
    }
    return <Layout header={<PortalHeader />} children={props.children} footer={<Footer />} />;
};
