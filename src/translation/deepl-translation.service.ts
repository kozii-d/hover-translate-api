import { Injectable } from "@nestjs/common";

import { SourceLanguageCode, TargetLanguageCode, Translator } from "deepl-node";

import { Language } from "./language.enity";
import { TranslationServiceInterface } from "./translation-service.interface";

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
    sourceLanguageCode: string,
    targetLanguageCode: string,
  ) {
    const response = await this.translator.translateText(
      input,
      sourceLanguageCode === "auto"
        ? null
        : (sourceLanguageCode as SourceLanguageCode),
      targetLanguageCode as TargetLanguageCode,
    );

    return {
      translatedText: response.text,
      detectedLanguageCode: response.detectedSourceLang,
    };
  }
}
