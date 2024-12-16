import { IsNotEmpty, IsString } from "class-validator";

export class TranslateRequestDto {
  @IsString()
  @IsNotEmpty()
  input: string;

  @IsString()
  @IsNotEmpty()
  sourceLanguageCode: string;

  @IsString()
  @IsNotEmpty()
  targetLanguageCode: string;
}
