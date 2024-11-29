import { Body, Controller, Get, Post } from "@nestjs/common";
import { TranslationService } from "./translation.service";
import { TranslateRequestDto } from "./dto/translate-request.dto";

@Controller("translation")
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get("languages")
  async getLanguages() {
    try {
      return this.translationService.getLanguages();
    } catch (error) {
      throw new Error(`Failed to fetch languages: ${error.message}`);
    }
  }

  @Post("translate")
  async translate(@Body() body: TranslateRequestDto) {
    try {
      const { input, sourceLocale, targetLocale } = body;
      const result = await this.translationService.translate(
        input,
        sourceLocale,
        targetLocale,
      );

      if (!result.text) {
        throw new Error("No translations found");
      }

      return { text: result.text };
    } catch (error) {
      throw new Error(`Translation failed: ${error.message}`);
    }
  }
}
