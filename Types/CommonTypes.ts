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

export interface TResponseDTO {
    data?: {
        email: string,
        username: string,
    }
    token?: string
    success?: boolean
}