import { sequelize } from "../../Database/DB.js";
import { callNodeMailerService, checkHashPassword, generateToken } from "../../utils/utils.js";
import User from '../../Database/models/User.js';
import { TUserResponseDTO } from "../../Types/CommonTypes.js";

class UserService {
    async signup(userDto: User): Promise<TUserResponseDTO> {
        if (!userDto || !userDto.email) {
            throw new Error("Invaild User data");
        }

        const transaction = await sequelize.transaction();

        try {
            const [user, created] = await User.findOrCreate({
                where: { email: userDto.email },
                defaults: userDto,
                transaction
            })
            await transaction.commit();
            const response: TUserResponseDTO = {
                data: {
                    email: user.email,
                    username: user.username
                },
                token: generateToken(user.id),
                success: created
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
                data: {
                    email: user.email,
                    username: user.username
                },
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