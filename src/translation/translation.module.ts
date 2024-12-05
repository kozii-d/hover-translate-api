import { Module } from "@nestjs/common";
import { TranslationController } from "./translation.controller";
import { GoogleTranslationService } from "./google-translation.service";

@Module({
  imports: [],
  controllers: [TranslationController],
  providers: [
    {
      provide: "TranslationServiceInterface",
      useClass: GoogleTranslationService,
    },
  ],
})
export class TranslationModule {}
