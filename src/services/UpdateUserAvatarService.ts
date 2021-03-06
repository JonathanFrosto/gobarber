import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/Users';
import uploadConfig from '../config/upload';

interface Request {
    userId: string;
    fileName: string;
}

class UpdateUserAvatarService {
    public async execute({ userId, fileName }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(userId);

        if (!user) {
            throw new Error('Only authenticated users can change avatar.');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.destination,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = fileName;
        userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
