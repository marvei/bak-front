import React from "react";
import { RouteComponentProps, StaticContext } from "react-router";

import { PortalLayout } from "src/modules/layout/portal-layout";
import { TeamPage } from "src/modules/team-page/team-page";

interface Props {
    tournamentId: number;
    matchId: number;
}

export const TeamPageRoute: React.FC<RouteComponentProps<[], StaticContext, Props | undefined>> = props => {
    const tournamentId = props.location.state != null ? props.location.state.tournamentId : undefined;
    const matchId = props.location.state != null ? props.location.state.matchId : undefined;

    return (
        <PortalLayout>
            <TeamPage tournamentId={tournamentId} matchId={matchId} />
        </PortalLayout>
    );
};
