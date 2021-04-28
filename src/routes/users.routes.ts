import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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
        });
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default usersRouter;