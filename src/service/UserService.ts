import { TuserDto } from "../../Types/CommonTypes.js";
import { User } from '../../Database/models/User.js';
import { sequelize } from "../../Database/DB.js";

class UserService {
    async signup(userDto: TuserDto) {
        if (!userDto || !userDto.email) {
            throw new Error("Invaild User data");
        }

        const transaction = await sequelize.transaction();

        try {
            const user = await User.findOrCreate({
                where: { email: userDto.email },
                defaults: userDto,
                transaction
            })
            await transaction.commit();
            return user;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            throw error;
        }
    }

    async deleteUser(userDto: TuserDto) {
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
}

export default UserService;