import * as process from "node:process";

import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { redisStore } from "cache-manager-redis-yet";

import { AuthModule } from "./auth/auth.module";
import { TranslationModule } from "./translation/translation.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      logging: process.env.NODE_ENV === "development",
    }),
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || "6379", 10),
          },
          password: process.env.REDIS_PASSWORD,
          ttl: 1000 * 60 * 60 * 24 * 7, // 1000 ms * 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
        });

        return { store };
      },
      isGlobal: true,
    }),
    TranslationModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
