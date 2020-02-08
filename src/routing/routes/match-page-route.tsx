import React from "react";
import { RouteComponentProps, StaticContext } from "react-router";

import { PortalLayout } from "src/modules/layout/portal-layout";
import { MatchPage } from "src/modules/match-page/match-page";

interface Props {
    id: number;
}

export const MatchPageRoute: React.FC<RouteComponentProps<[], StaticContext, Props | undefined>> = props => {
    const id = props.location.state != null ? props.location.state.id : undefined;

    return (
        <PortalLayout>
            <MatchPage id={id} />
        </PortalLayout>
    );
};
