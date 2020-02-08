//tslint:disable
export interface User {
    id: number;
    Username: string;
    Password: string;
    Age: number;
    Role: string;
    fk_teamId: number;
}

export interface Tournament {
    id: number;
    Name: string;

}

export interface Match {
    id: number;
    Name: string;
    Date?: Date;
}

export interface Team {
    id: number;
    Name: string;
}

export interface UserJwtDto {
    role: string;
    unique_name: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
}

export const emptyUserDto: User = {
    Username: "",
    Password: "",
    Age: 0,
    Role: "Registered",
    id: 0,
    fk_teamId: 0
}

export const emptyTournamentDto: Tournament = {
    id: 0,
    Name: ""
}

export const emptyMatchDto: Match = {
    id: 0,
    Name: "",
    Date: undefined
}

export const emptyTeamDto: Team = {
    id: 0,
    Name: "",
}
