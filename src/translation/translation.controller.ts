import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import { TranslateRequestDto } from "./dto/translate-request.dto";
import { TranslationServiceInterface } from "./translation-service.interface";

@UseGuards(AuthGuard)
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

      return { text: result };
    } catch (error) {
      throw new Error(`Translation failed: ${error.message}`);
    }
  }
}
