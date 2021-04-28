import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';

interface UserDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: UserDTO): Promise<User> {
        const userRepository = getRepository(User);

        const anotherUser = await userRepository.findOne({
            where: { email },
        });

        if (anotherUser) {
            throw Error('email already used');
        }

        const encryptPassword = await hash(password, 8);

        const newUser = userRepository.create({
            name,
            email,
            password: encryptPassword,
        });

        await userRepository.save(newUser);

        return newUser;
    }
}

export default CreateUserService;
