import React, { useState, useEffect } from "react";
//import { AppHistory } from "src/routing/app-history";
import { Tournament, emptyTournamentDto } from "../dataType";
import Axios from "axios";
import { TournamentTableRow } from "./tournament-table-row";
//import { AppRoutesPaths } from "src/routing/app-routes-path";

import "./tournament-page.scss";

function getTournaments(token: string, setUsers: React.Dispatch<React.SetStateAction<Tournament[] | undefined>>): void {
    Axios({
        method: "GET",
        url: "https://localhost:44346/api/tournament",
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            setUsers(response.data as Tournament[]);
        }
    });
}

export const TournamentPage: React.FC = () => {
    const [Token] = useState<string | null>(localStorage.getItem("token"));
    const [hack, setHack] = useState<boolean>(false);
    const [isCreatingTournament, setIsCreatingTournament] = useState<boolean>(false);
    const [tournaments, setTournaments] = useState<Tournament[]>();

    if (Token == null) {
        return null;
    }

    useEffect(() => {
        getTournaments(Token, setTournaments);
        // getUsers(setUsers);
    }, [hack]);

    return (
        <div className="tournament-page">
            <div className="title">
                <b>TOURNAMENTS</b>
            </div>
            <div>
                <button className="button" onClick={() => setIsCreatingTournament(true)}>
                    New Tournament
                </button>
            </div>

            {isCreatingTournament ? <TournamentTableRow tournament={emptyTournamentDto}
            reloadData={() => setHack(!hack)} isNew={true} /> : null}

            {tournaments != null && tournaments.length > 0
                ? tournaments.map(tournament => <TournamentTableRow tournament={tournament}
                    key={tournament.id} reloadData={() => setHack(!hack)} />)
                : null}
        </div>
    );
};
