import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { TranslationModule } from "./translation/translation.module";

@Module({
  imports: [TranslationModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
