import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

class AlterAppointmentsColumnsName1619573522379 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('appointments', 'id', 'appointments_id');

        await queryRunner.renameColumn(
            'appointments',
            'provider',
            'provider_id',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('appointments', 'appointments_id', 'id');

        await queryRunner.renameColumn(
            'appointments',
            'provider_id',
            'provider',
        );
    }
}

export default AlterAppointmentsColumnsName1619573522379;
