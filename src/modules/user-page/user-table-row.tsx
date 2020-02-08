import React, { useState } from "react";
import Axios from "axios";

import { User } from "../dataType";

import "./user-table-row.scss";

const InfoSection = (props: InfoSectionProps) => (
    <div className="info-section-wrapper">
        <label>
            {props.label}
            <input value={props.inputValue} onChange={event => props.onChange(event.target.value)} />
        </label>
    </div>
);

function DeleteUser(token: string, userId: number, reloadData: () => void): void {
    Axios({
        method: "DELETE",
        url: `https://localhost:44346/api/user/${userId}`,
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            alert("USER DELETED!");
            reloadData();
        }
    });
}

function UpdateUser(token: string, userId: number, username: string, age: number, role: string): void {
    Axios({
        method: "PUT",
        url: `https://localhost:44346/api/user/${userId}`,
        headers: { Authorization: "Bearer " + token },
        data: {
            Username: username,
            Age: age,
            Role: role
        }
    }).then(response => {
        if (response.status === 200) {
            alert("USER UPDATED!");
        }
    });
}

function CreateUser(token: string, username: string, password: string, age: number, role: string, reloadData: () => void): void {
    Axios({
        method: "POST",
        url: "https://localhost:44346/api/user",
        //headers: { Authorization: "Bearer " + token },
        data: {
            Username: username,
            Password: password,
            Age: age,
            Role: role
        }
    }).then(response => {
        if (response.status === 200) {
            alert("USER CREATED!");
            reloadData();
        }
    });
}

interface Props {
    user: User;
    reloadData(): void;
    isNew?: boolean;
}

interface InfoSectionProps {
    label: string;
    inputValue: string | number;
    //tslint:disable:no-any
    onChange: (value: any) => void;
}

export const UserTableRow: React.FC<Props> = ({ user, reloadData, isNew }) => {
    const [name, setName] = useState<string>(user.Username);
    const [age, setAge] = useState<number>(user.Age);
    const [team, setTeam] = useState<number>(user.fk_teamId);
    const [role, setRole] = useState<string>(user.Role);
    const [password, setPassword] = useState<string>(user.Password);
    const token = localStorage.getItem("token");

    return (
        <div className="user">
            <InfoSection inputValue={name} onChange={newInput => setName(newInput)} label="Name" />
            <InfoSection inputValue={age} onChange={newInput => setAge(newInput)} label="Age" />
            <InfoSection inputValue={team} onChange={newInput => setTeam(newInput)} label="Team ID" />
            {/* <InfoSection inputValue={role} onChange={newInput => setRole(newInput)} label="Role" /> */}
            <div className="info-section-wrapper">
                <label>
                    Role
                    <select onChange={value => setRole(value.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Registered">Registered</option>
                        <option value="Unregistered">Unregistered</option>
                    </select>
                </label>
            </div>
            {isNew == null || !isNew ? (
                <>
                    <button className="button alert" onClick={() => DeleteUser(token!, user.id, reloadData)}>
                        Delete
                    </button>
                    <button className="button success" onClick={() => UpdateUser(token!, user.id, name, age, role)}>
                        Save Edit
                    </button>
                </>
            ) : (
                <>
                    <InfoSection inputValue={password} onChange={newInput => setPassword(newInput)} label="Password" />
                    <button className="button success" onClick={() => CreateUser(token!, name, password, age, role, reloadData)}>
                        Add
                    </button>
                </>
            )}
        </div>
    );
};
