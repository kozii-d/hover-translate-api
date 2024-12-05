import { Module } from "@nestjs/common";

import { GoogleTranslationService } from "./google-translation.service";
import { TranslationController } from "./translation.controller";

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
