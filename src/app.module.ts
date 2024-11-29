import { Module } from "@nestjs/common";
import { TranslationModule } from "./translation/translation.module";

@Module({
  imports: [TranslationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
