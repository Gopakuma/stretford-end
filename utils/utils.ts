import { TuserDto } from '../Types/CommonTypes.js';

export const hashPassword = (user: TuserDto) => {
    console.log(user);
    return user.password;
}