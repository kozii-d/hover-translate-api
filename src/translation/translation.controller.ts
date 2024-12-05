import { Body, Controller, Get, Inject, Post } from "@nestjs/common";

import { TranslateRequestDto } from "./dto/translate-request.dto";
import { TranslationServiceInterface } from "./translation-service.interface";

@Controller("translation")
export class TranslationController {
  constructor(
    @Inject("TranslationServiceInterface")
    private readonly translationService: TranslationServiceInterface,
  ) {}

  @Get("languages")
  async getLanguages() {
    try {
      return this.translationService.getSupportedLanguages();
    } catch (error) {
      throw new Error(`Failed to fetch languages: ${error.message}`);
    }
  }

  @Post("translate")
  async translate(@Body() body: TranslateRequestDto) {
    try {
      const { input, sourceLocale, targetLocale } = body;
      const result = await this.translationService.translateText(
        input,
        sourceLocale,
        targetLocale,
      );

      if (!result) {
        throw new Error("No translations found");
      }

      return { text: result };
    } catch (error) {
      throw new Error(`Translation failed: ${error.message}`);
    }
  }
}
