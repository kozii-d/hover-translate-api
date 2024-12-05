import fs from "fs";

import { Injectable } from "@nestjs/common";

import { TranslationServiceClient } from "@google-cloud/translate";

import { TranslationServiceInterface } from "./translation-service.interface";

@Injectable()
export class GoogleTranslationService implements TranslationServiceInterface {
  private readonly translator: TranslationServiceClient;
  private readonly projectId: string;

  constructor() {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not defined");
    }

    const { project_id } = JSON.parse(
      fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"),
    );

    if (!project_id) {
      throw new Error(
        "project_id is not defined in GOOGLE_APPLICATION_CREDENTIALS",
      );
    }

    this.projectId = project_id;

    this.translator = new TranslationServiceClient();
  }

  async getSupportedLanguages() {
    const request = {
      parent: `projects/${this.projectId}/locations/global`,
    };

    const [response] = await this.translator.getSupportedLanguages(request);

    return response.languages.reduce(
      (acc, language) => {
        if (language.supportTarget) {
          acc.targetLanguages.push({
            code: language.languageCode,
            name: language.displayName,
          });
        }

        if (language.supportSource) {
          acc.sourceLanguages.push({
            code: language.languageCode,
            name: language.displayName,
          });
        }

        return acc;
      },
      { targetLanguages: [], sourceLanguages: [] },
    );
  }

  async translateText(
    input: string,
    sourceLocale: string,
    targetLocale: string,
  ) {
    const request = {
      parent: `projects/${this.projectId}/locations/global`,
      contents: [input],
      mimeType: "text/plain",
      sourceLanguageCode: sourceLocale === "auto" ? null : sourceLocale,
      targetLanguageCode: targetLocale,
    };

    const [response] = await this.translator.translateText(request);
    return response.translations[0].translatedText;
  }
}
