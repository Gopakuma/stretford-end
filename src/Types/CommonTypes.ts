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
    matchDay: string | null;
    matchTime: string | null;
    home: string | null;
    away: string | null;
    status?: string;
    result?: {
        homeScore: number,
        awayScore: number
    }
};