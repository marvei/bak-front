import React from "react";
import { PagePage } from "src/modules/page-page/page-page";
import { PortalLayout } from "src/modules/layout/portal-layout";

export const PagePageRoute: React.FC = () => (
    <PortalLayout>
        <PagePage />
    </PortalLayout>
);
