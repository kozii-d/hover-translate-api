import { Injectable } from "@nestjs/common";
import { SourceLanguageCode, TargetLanguageCode, Translator } from "deepl-node";
import { TranslationServiceInterface } from "./translation-service.interface";
import { Language } from "./language.enity";

@Injectable()
export class DeeplTranslationService implements TranslationServiceInterface {
  private readonly translator: Translator;

  constructor() {
    if (!process.env.DEEPL_API_KEY) {
      throw new Error("DEEPL_API_KEY is not defined");
    }

    this.translator = new Translator(process.env.DEEPL_API_KEY);
  }

  async getSupportedLanguages() {
    const [targetLanguages, sourceLanguages] = await Promise.all([
      this.translator.getTargetLanguages(),
      this.translator.getSourceLanguages(),
    ]);

    return {
      targetLanguages: targetLanguages as Language[],
      sourceLanguages: sourceLanguages as Language[],
    };
  }

  async translateText(
    input: string,
    sourceLocale: string,
    targetLocale: string,
  ) {
    const response = await this.translator.translateText(
      input,
      sourceLocale === "auto" ? null : (sourceLocale as SourceLanguageCode),
      targetLocale as TargetLanguageCode,
    );

    return response.text;
  }
}
