import React, { useState, useEffect } from "react";
//import { AppHistory } from "src/routing/app-history";
import { Match, emptyMatchDto } from "../dataType";
import Axios from "axios";
import { MatchTableRow } from "./match-table-row";
//import { AppRoutesPaths } from "src/routing/app-routes-path";

import "./match-page.scss";

function getMatches(token: string, id: number, setMatches: React.Dispatch<React.SetStateAction<Match[] | undefined>>): void {
    Axios({
        method: "GET",
        url: `https://localhost:44346/api/tournament/${id}/match`,
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            setMatches(response.data as Match[]);
        }
    });
}

interface Props {
    id: number | undefined;
}

export const MatchPage: React.FC<Props> = ({ id }) => {
    const [Token] = useState<string | null>(localStorage.getItem("token"));
    const [hack, setHack] = useState<boolean>(false);
    const [isCreatingMatch, setIsCreatingMatch] = useState<boolean>(false);
    const [matches, setMatches] = useState<Match[]>();

    if (Token == null) {
        return null;
    }

    useEffect(() => {
        getMatches(Token, id!, setMatches);
        // getUsers(setUsers);
    }, [hack]);

    return (
        <div className="match-page">
            <div className="title">
                <b>MATCHES</b>
            </div>
            <div>
                <button className="button" onClick={() => setIsCreatingMatch(true)}>
                    New Match
                </button>
            </div>

            {isCreatingMatch ? <MatchTableRow match={emptyMatchDto} id={id!} reloadData={() => setHack(!hack)} isNew={true} /> : null}

            {matches != null && matches.length > 0
                ? matches.map(match => <MatchTableRow match={match} key={match.id} id={id!} reloadData={() => setHack(!hack)} />)
                : null}
        </div>
    );
};
