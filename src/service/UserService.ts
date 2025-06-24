import { sequelize } from "../../Database/DB.js";
import { callNodeMailerService, checkHashPassword, generateToken } from "../../utils/utils.js";
import User from '../../Database/models/User.js';
import { TUserResponseDTO } from "../../Types/CommonTypes.js";
import { Op } from "sequelize";
import validator, { isLowercase } from "validator";

class UserService {
    async signup(userDto: User): Promise<TUserResponseDTO> {
        if (!userDto || !userDto.email) {
            throw new Error("Invaild User data");
        }

        if (!validator.isEmail(userDto.email)) {
            throw new Error("Invaild Email");
        }

        if (userDto.password.length < 6) {
            throw new Error("Password too short");
        }

        const transaction = await sequelize.transaction();

        try {
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: {
                        email: userDto.email,
                        username: userDto.username
                    }
                },
                transaction
            })

            if (existingUser) {
                let message = 'User Already Exist';
                if (existingUser.email == userDto.email) {
                    message = 'Email already exist';
                } else if (existingUser.username == userDto.username) {
                    message = 'Username Already exist'
                }
                const response: TUserResponseDTO = {
                    email: existingUser.email,
                    username: existingUser.username,
                    message,
                    success: false
                }

                return response;
            }

            const user = await User.create({
                email: userDto.email.toLowerCase(),
                password: userDto.password,
                username: userDto.username.toLowerCase()
            }, { transaction })

            await transaction.commit();

            const response: TUserResponseDTO = {
                email: user.email,
                username: user.username,
                token: generateToken(user.id),
                success: true
            }

            return response;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            throw error;
        }
    }

    async deleteUser(userDto: User) {
        if (!userDto || !userDto.email) {
            throw new Error("Invaild User data");
        }
        const transaction = await sequelize.transaction();
        try {
            const user = await User.findOne({
                where: { email: userDto.email },
                transaction
            })
            if (!user) {
                throw new Error("User Not Found");
            }
            await user.destroy({ transaction });
            await transaction.commit();
            return user;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async login(userDto: User): Promise<TUserResponseDTO> {
        if (!userDto || !userDto.email) {
            throw new Error("Invaild User data");
        }

        try {
            const user: User = await User.findOne({
                where: { email: userDto.email },
            });

            const isMatch = await checkHashPassword(userDto, user.password);
            if (!isMatch) throw new Error("Invalid email or password");

            const response: TUserResponseDTO = {
                email: user.email,
                username: user.username,
                token: generateToken(user.id),
                success: isMatch
            }

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async notification(userDto: User): Promise<Boolean> {
        const res = callNodeMailerService(userDto);
        console.log(res);
        return true;
    }

}

export default UserService;