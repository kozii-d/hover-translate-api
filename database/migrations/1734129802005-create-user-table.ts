import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1734129802005 implements MigrationInterface {
    name = 'CreateUserTable1734129802005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "googleId" character varying NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL, "name" character varying NOT NULL, "givenName" character varying, "familyName" character varying, "picture" text, "isLoggedIn" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f382af58ab36057334fb262efd5" UNIQUE ("googleId"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f382af58ab36057334fb262efd" ON "users" ("googleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f382af58ab36057334fb262efd"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
