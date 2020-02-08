import React, { useState } from "react";

import Axios from "axios";

import { Team } from "../dataType";

import "./team-table-row.scss";

const InfoSection = (props: InfoSectionProps) => (
    <div className="info-section-wrapper">
        <label>
            {props.label}
            <input value={props.inputValue} onChange={event => props.onChange(event.target.value)} />
        </label>
    </div>
);

// function deleteTeam(token: string, tournamentId: number, matchId: number, id: number, reloadData: () => void): void {
//     Axios({
//         method: "DELETE",
//         url: `https://localhost:44346/api/tournament/${tournamentId}/match/${matchId}/team/${id}`,
//         headers: { Authorization: "Bearer " + token }
//     }).then(response => {
//         if (response.status === 200) {
//             alert("MATCH DELETED!");
//             reloadData();
//         }
//     });
// }

// function updateTeam(token: string, tournamentId: number, matchId: number, id: number, name: string): void {
//     Axios({
//         method: "PUT",
//         url: `https://localhost:44346/api/tournament/${tournamentId}/match/${matchId}/team/${id}`,
//         headers: { Authorization: "Bearer " + token },
//         data: {
//             Name: name
//         }
//     }).then(response => {
//         if (response.status === 200) {
//             alert("MATCH UPDATED!");
//         }
//     });
// }

// function createTeam(token: string, tournamentId: number, matchId: number, name: string, reloadData: () => void): void {
//     Axios({
//         method: "POST",
//         url: `https://localhost:44346/api/tournament/${tournamentId}/match/${matchId}/team`,
//         headers: { Authorization: "Bearer " + token },
//         data: {
//             Name: name
//         }
//     }).then(response => {
//         if (response.status === 200) {
//             alert("MATCH CREATED!");
//             reloadData();
//         }
//     });
// }

interface Props {
    team: Team;
}

interface InfoSectionProps {
    label: string;
    inputValue: string | number;
    //tslint:disable:no-any
    onChange: (value: any) => void;
}

export const PublicTeamTableRow: React.FC<Props> = ({ team }) => {
    const [name, setName] = useState<string>(team.Name);
    // const token = localStorage.getItem("token");

    return (
        <div className="team">
            <InfoSection inputValue={name} onChange={newInput => setName(newInput)} label="Name" />
        </div>
    );
};
