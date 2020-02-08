import React from "react";
import { Layout } from "./layout";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

interface Props {
    children: React.ReactNode;
}

export const PublicLayout = (props: Props): JSX.Element => <Layout header={<Header/>} children={props.children} footer={<Footer/>}/>;
