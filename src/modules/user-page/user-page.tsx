import React, { useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import Axios from "axios";

import { User, emptyUserDto } from "../dataType";
import { UserTableRow } from "./user-table-row";

import "./user-page.scss";
import "react-day-picker/lib/style.css";

function getUsers(token: string, setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>): void {
    Axios({
        method: "GET",
        url: "https://localhost:44346/api/user",
        headers: { Authorization: "Bearer " + token }
    }).then(response => {
        if (response.status === 200) {
            setUsers(response.data as User[]);
        }
    });
}

export const UserPage: React.FC = () => {
    const [Token] = useState<string | null>(localStorage.getItem("token"));
    const [hack, setHack] = useState<boolean>(false);
    const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>();
    const [date, setDate] = useState<Date | undefined>(undefined);

    if (Token == null) {
        return null;
    }

    useEffect(() => {
        getUsers(Token, setUsers);
        // getUsers(setUsers);
    }, [hack]);

    return (
        <div className="user-page">
            <div className="title">
                <b>USERS</b>
            </div>
            <div>
                <button className="button" onClick={() => setIsCreatingUser(true)}>
                    New User
                </button>
            </div>

            {/* <DayPickerInput onDayChange={newDate => setDate(newDate)} value={date} /> */}
            <div className="user-table">
                {isCreatingUser ? <UserTableRow user={emptyUserDto} reloadData={() => setHack(!hack)} isNew={true} /> : null}

                {users != null && users.length > 0
                    ? users.map(user => <UserTableRow user={user} key={user.id} reloadData={() => setHack(!hack)} />)
                    : null}
            </div>
        </div>
    );
};
