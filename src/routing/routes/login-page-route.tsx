import React from "react";
import { PublicLayout } from "src/modules/layout/public-layout";
import { LoginPage } from "src/modules/login-page/login-page";

export const LoginPageRoute: React.FC = () => (
    <PublicLayout>
        <LoginPage></LoginPage>
    </PublicLayout>
);
