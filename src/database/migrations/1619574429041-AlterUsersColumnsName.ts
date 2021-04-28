import { MigrationInterface, QueryRunner } from 'typeorm';

class AlterUsersColumnsName1619574429041 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('users', 'id', 'users_id');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('users', 'users_id', 'id');
    }
}

export default AlterUsersColumnsName1619574429041;
