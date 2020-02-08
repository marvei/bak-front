import React, { useState } from "react";
import Axios from "axios";

import { Tournament } from "../dataType";

import "./tournament-table-row.scss";
import { AppHistory } from "src/routing/app-history";
import { AppRoutesPaths } from "src/routing/app-routes-path";

const InfoSection = (props: InfoSectionProps) => (
    <div className="info-section-wrapper">
        <label>
            {props.label}
            <input value={props.inputValue} onChange={event => props.onChange(event.target.value)} />
        </label>
    </div>
);

function DeleteTournament(token: string, tournamentId: number, reloadData: () => void): void {
    Axios({
        method: "DELETE",
        url: `https://localhost:44346/api/tournament/${tournamentId}`,
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            alert("TOURNAMENT DELETED!");
            reloadData();
        }
    });
}

function UpdateTournament(token: string, tournamentId: number, name: string): void {
    Axios({
        method: "PUT",
        url: `https://localhost:44346/api/tournament/${tournamentId}`,
        headers: { Authorization: "Bearer " + token },
        data: {
            Name: name
        }
    }).then(response => {
        if (response.status === 200) {
            alert("TOURNAMENT UPDATED!");
        }
    });
}

function CreateTournament(token: string, name: string, reloadData: () => void): void {
    Axios({
        method: "POST",
        url: "https://localhost:44346/api/tournament",
        headers: { Authorization: "Bearer " + token },
        data: {
            Name: name
        }
    }).then(response => {
        if (response.status === 200) {
            alert("TOURNAMENT CREATED!");
            reloadData();
        }
    });
}

interface Props {
    tournament: Tournament;
    reloadData(): void;
    isNew?: boolean;
}

interface InfoSectionProps {
    label: string;
    inputValue: string | number;
    //tslint:disable:no-any
    onChange: (value: any) => void;
}

export const TournamentTableRow: React.FC<Props> = ({ tournament, reloadData, isNew }) => {
    const [name, setName] = useState<string>(tournament.Name);
    const token = localStorage.getItem("token");

    return (
        <div className="tournament">
            <p>{tournament.id}</p>
            <InfoSection inputValue={name} onChange={newInput => setName(newInput)} label="Name" />
            {isNew == null || !isNew ? (
                <>
                    <button className="button alert" onClick={() => DeleteTournament(token!, tournament.id, reloadData)}>
                        Delete
                    </button>
                    <button className="button success" onClick={() => UpdateTournament(token!, tournament.id, name)}>
                        Save Edit
                    </button>
                    <button
                        className="button clear"
                        onClick={() => {
                            AppHistory.push(AppRoutesPaths.matchPage, { id: tournament.id });
                        }}
                    >
                        Match List
                    </button>
                </>
            ) : (
                <button className="button success" onClick={() => CreateTournament(token!, name, reloadData)}>
                    Add
                </button>
            )}
        </div>
    );
};
