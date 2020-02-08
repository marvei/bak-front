import React, { useState, useEffect } from "react";
//import { AppHistory } from "src/routing/app-history";
import { Team, emptyTeamDto } from "../dataType";
import Axios from "axios";
import { TeamTableRow } from "./team-table-row";
//import { AppRoutesPaths } from "src/routing/app-routes-path";

import "./team-page.scss";

function getTeams(
    token: string,
    tournamentId: number | undefined,
    matchId: number | undefined,
    setTeams: React.Dispatch<React.SetStateAction<Team[] | undefined>>
): void {
    Axios({
        method: "GET",
        url: `https://localhost:44346/api/tournament/${tournamentId}/match/${matchId}/team`,
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            setTeams(response.data as Team[]);
        }
    });
}

interface Props {
    tournamentId: number | undefined;
    matchId: number | undefined;
}

export const TeamPage: React.FC<Props> = ({ tournamentId, matchId }) => {
    const [Token] = useState<string | null>(localStorage.getItem("token"));
    const [hack, setHack] = useState<boolean>(false);
    const [isCreatingTeam, setIsCreatingTeam] = useState<boolean>(false);
    const [teams, setTeams] = useState<Team[]>();

    if (Token == null) {
        return null;
    }

    useEffect(() => {
        getTeams(Token, tournamentId, matchId, setTeams);
        // getUsers(setUsers);
    }, [hack]);

    return (
        <div className="match-page">
            <div className="title">
                <b>TEAMS</b>
            </div>
            <div>
                <button className="button" onClick={() => setIsCreatingTeam(true)}>
                    New Team
                </button>
            </div>

            {isCreatingTeam ? (
                <TeamTableRow
                    team={emptyTeamDto}
                    tournamentId={tournamentId!}
                    matchId={matchId!}
                    reloadData={() => setHack(!hack)}
                    isNew={true}
                />
            ) : null}

            {teams != null && teams.length > 0
                ? teams.map(team => (
                      <TeamTableRow
                          team={team}
                          key={team.id}
                          tournamentId={tournamentId!}
                          matchId={matchId!}
                          reloadData={() => setHack(!hack)}
                      />
                  ))
                : null}
        </div>
    );
};
