import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import Axios from "axios";

import { Match } from "../dataType";

import "./match-table-row.scss";
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

function DeleteMatch(token: string, matchId: number, id: number, reloadData: () => void): void {
    Axios({
        method: "DELETE",
        url: `https://localhost:44346/api/tournament/${id}/match/${matchId}`,
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            alert("MATCH DELETED!");
            reloadData();
        }
    });
}

function UpdateMatch(token: string, matchId: number, name: string, date: Date, id: number): void {
    Axios({
        method: "PUT",
        url: `https://localhost:44346/api/tournament/${id}/match/${matchId}`,
        headers: { Authorization: "Bearer " + token },
        data: {
            Name: name,
            Date: date
        }
    }).then(response => {
        if (response.status === 200) {
            alert("MATCH UPDATED!");
        }
    });
}

function CreateMatch(token: string, name: string, date: Date, id: number, reloadData: () => void): void {
    Axios({
        method: "POST",
        url: `https://localhost:44346/api/tournament/${id}/match`,
        headers: { Authorization: "Bearer " + token },
        data: {
            Name: name,
            Date: date
        }
    }).then(response => {
        if (response.status === 200) {
            alert("MATCH CREATED!");
            reloadData();
        }
    });
}

interface Props {
    match: Match;
    id: number;
    reloadData(): void;
    isNew?: boolean;
}

interface InfoSectionProps {
    label: string;
    inputValue: string | number;
    //tslint:disable:no-any
    onChange: (value: any) => void;
}

export const MatchTableRow: React.FC<Props> = ({ match, reloadData, isNew, id }) => {
    const [name, setName] = useState<string>(match.Name);
    const [date, setDate] = useState<Date | undefined>(match.Date);
    const token = localStorage.getItem("token");
    return (
        <div className="match">
            <InfoSection inputValue={name} onChange={newInput => setName(newInput)} label="Name" />
            <div className="info-section-wrapper">
                <label>
                    Date
                    <DayPickerInput onDayChange={setDate} value={date} />
                    {/* <input type="date" value={date} onChange={() => setDate(date)} /> */}
                </label>
            </div>
            {isNew == null || !isNew ? (
                <>
                    <button className="button alert" onClick={() => DeleteMatch(token!, match.id, id, reloadData)}>
                        Delete
                    </button>
                    <button className="button success" onClick={() => UpdateMatch(token!, match.id, name, date!, id)}>
                        Save Edit
                    </button>
                    <button
                        className="button clear"
                        onClick={() => {
                            AppHistory.push(AppRoutesPaths.teamPage, { tournamentId: id, matchId: match.id });
                        }}
                    >
                        Team List
                    </button>
                </>
            ) : (
                <>
                    <button className="button success" onClick={() => CreateMatch(token!, name, date!, id, reloadData)}>
                        Add
                    </button>
                </>
            )}
        </div>
    );
};
