import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        return response.json({
            id: user.users_id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            console.log(request.file);

            const avatarService = new UpdateUserAvatarService();

            const user = await avatarService.execute({
                userId: request.user.id,
                fileName: request.file.filename,
            });

            return response.json({
                id: user.users_id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            });
        } catch (err) {
            return response.json({ message: 'ok' });
        }
    },
);

export default usersRouter;
