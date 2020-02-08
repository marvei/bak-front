import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Team } from "../dataType";
import { PublicTeamTableRow } from "./public-team-table-row";

import "./team-page.scss";

function getTeams(token: string, setTeams: React.Dispatch<React.SetStateAction<Team[] | undefined>>): void {
    Axios({
        method: "GET",
        url: `https://localhost:44346/api/team`,
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            setTeams(response.data as Team[]);
        }
    });
}

export const PublicTeamPage: React.FC = () => {
    const [Token] = useState<string | null>(localStorage.getItem("token"));
    const [teams, setTeams] = useState<Team[]>();

    if (Token == null) {
        return null;
    }

    useEffect(() => {
        getTeams(Token, setTeams);
        // getUsers(setUsers);
    }, []);

    return (
        <div className="match-page">
            <div className="title">
                <b>TEAMS</b>
            </div>

            {teams != null && teams.length > 0 ? teams.map(team => <PublicTeamTableRow team={team} key={team.id} />) : null}
        </div>
    );
};
