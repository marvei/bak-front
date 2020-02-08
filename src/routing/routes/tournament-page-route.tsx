import React from "react";

import { TournamentPage } from "src/modules/tournament-page/tournament-page";
import { PortalLayout } from "src/modules/layout/portal-layout";

export const TournamentPageRoute: React.FC = () => (
    <PortalLayout>
        <TournamentPage></TournamentPage>
    </PortalLayout>
);
