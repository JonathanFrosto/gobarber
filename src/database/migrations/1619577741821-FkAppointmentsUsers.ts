import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

class FkAppointmentsUsers1619577741821 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'appointments',
            'provider_id',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'fk_appointments_users',
                columnNames: ['provider_id'],
                referencedColumnNames: ['users_id'],
                referencedTableName: 'users',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'appointments',
            'fk_appointments_users',
        );

        await queryRunner.changeColumn(
            'appointments',
            'provider_id',
            new TableColumn({
                name: 'provider_id',
                type: 'varchar',
            }),
        );
    }
}

export default FkAppointmentsUsers1619577741821;
