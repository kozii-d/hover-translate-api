import { Language } from "./language.enity";

export interface TranslationServiceInterface {
  translateText(
    input: string,
    sourceLanguageCode: string,
    targetLanguageCode: string,
  ): Promise<{ translatedText: string; detectedLanguageCode: string }>;

  getSupportedLanguages(): Promise<{
    targetLanguages: Language[];
    sourceLanguages: Language[];
  }>;
}
