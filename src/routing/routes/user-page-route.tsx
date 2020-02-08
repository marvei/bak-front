import React from "react";

import { UserPage } from "src/modules/user-page/user-page";
import { PortalLayout } from "src/modules/layout/portal-layout";

export const UserPageRoute: React.FC = () => (
    <PortalLayout>
        <UserPage></UserPage>
    </PortalLayout>
);
