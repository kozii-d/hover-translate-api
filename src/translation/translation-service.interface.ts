import { Language } from "./language.enity";

export interface TranslationServiceInterface {
  translateText(
    input: string,
    sourceLocale: string,
    targetLocale: string,
  ): Promise<{ translatedText: string; detectedLanguageCode: string }>;

  getSupportedLanguages(): Promise<{
    targetLanguages: Language[];
    sourceLanguages: Language[];
  }>;
}
