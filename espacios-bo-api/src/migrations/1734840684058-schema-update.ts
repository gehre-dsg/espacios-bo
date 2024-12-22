import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1734840684058 implements MigrationInterface {
    name = 'SchemaUpdate1734840684058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_5e6e798c742c4bbf665f55c3ed3"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "estado_id" integer`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "rol_id" integer`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_b3e7639402cbbdf3c65e9adb567" FOREIGN KEY ("estado_id") REFERENCES "estado"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533" FOREIGN KEY ("rol_id") REFERENCES "rol"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_b3e7639402cbbdf3c65e9adb567"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "rol_id"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "estado_id"`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "estado" integer`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_5e6e798c742c4bbf665f55c3ed3" FOREIGN KEY ("estado") REFERENCES "estado"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
