import { Injectable } from "@nestjs/common";
import { SourceLanguageCode, TargetLanguageCode, Translator } from "deepl-node";

@Injectable()
export class TranslationService {
  private readonly translator: Translator;

  constructor() {
    if (!process.env.DEEPL_API_KEY) {
      throw new Error("DEEPL_API_KEY is not defined");
    }

    this.translator = new Translator(process.env.DEEPL_API_KEY);
  }

  async getLanguages() {
    const [targetLanguages, sourceLanguages] = await Promise.all([
      this.translator.getTargetLanguages(),
      this.translator.getSourceLanguages(),
    ]);

    return { targetLanguages, sourceLanguages };
  }

  async translate(
    input: string,
    sourceLocale: SourceLanguageCode | "auto",
    targetLocale: TargetLanguageCode,
  ) {
    return this.translator.translateText(
      input,
      sourceLocale === "auto" ? null : sourceLocale,
      targetLocale,
    );
  }
}
