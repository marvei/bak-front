import React from "react";
import { LandingPage } from "src/modules/landing-page/landing-page";
import { PortalLayout } from "src/modules/layout/portal-layout";

export const LandingPageRoute: React.FC = () => (
    <PortalLayout>
        <LandingPage />
    </PortalLayout>
);
