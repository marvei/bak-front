import React from "react";

import { PortalLayout } from "src/modules/layout/portal-layout";
import { PublicTeamPage } from "src/modules/team-page/public-team-page";

export const PublicTeamPageRoute: React.FC = () =>
    (
        <PortalLayout>
            <PublicTeamPage />
        </PortalLayout>
    );
