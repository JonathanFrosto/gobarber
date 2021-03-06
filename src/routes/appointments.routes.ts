import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute({
            provider_id,
            date: parsedDate,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default appointmentsRouter;
