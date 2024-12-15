import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import { TranslateRequestDto } from "./dto/translate-request.dto";
import { TranslationServiceInterface } from "./translation-service.interface";

@UseInterceptors(CacheInterceptor)
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

  @UseGuards(AuthGuard)
  @Get("translate")
  async translate(@Query() query: TranslateRequestDto) {
    try {
      const { input, sourceLocale, targetLocale } = query;
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
