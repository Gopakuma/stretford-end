export type Tserver = {
    port: number
    host: string
}

export type Tdb = {
    name: string;
    user: string;
    password: string;
    host: string;
    port: number;
}

export type TconfigApi = {
    baseURL: string;
}

export interface TUserResponseDTO {
    email: string,
    username: string,
    message?: string,
    token?: string
    success?: boolean
}

export type TSquadResponseDTO = {
    data: { name: string; nationality: string; position: string; }[];
};

export type TMatchdayDTO = {
    matchDay: string;
    matchTime: string;
    home: string;
    away: string;
    status?: string;
    result?: {
        homeScore: number,
        awayScore: number
    }
};