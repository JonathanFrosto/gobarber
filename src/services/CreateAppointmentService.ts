import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface AppointmentDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({
        provider_id,
        date,
    }: AppointmentDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const currentHour = startOfHour(date);

        const reserved = await appointmentsRepository.findByDate(currentHour);

        if (reserved) {
            throw Error('Horário já marcado');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: currentHour,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
