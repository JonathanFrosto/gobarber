import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import credentials from '../config/credentials';
import User from '../models/Users';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const correctPassword = await compare(password, user.password);
        if (!correctPassword) {
            throw new Error('Incorrect email/password combination.');
        }

        const { secret, expiresIn } = credentials;

        const token = sign({}, secret, {
            subject: user.users_id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
