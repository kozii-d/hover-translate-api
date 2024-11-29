import { IsNotEmpty, IsString } from "class-validator";
import { SourceLanguageCode, TargetLanguageCode } from "deepl-node";

export class TranslateRequestDto {
  @IsString()
  @IsNotEmpty()
  input: string;

  @IsString()
  @IsNotEmpty()
  sourceLocale: SourceLanguageCode | "auto";

  @IsString()
  @IsNotEmpty()
  targetLocale: TargetLanguageCode;
}
