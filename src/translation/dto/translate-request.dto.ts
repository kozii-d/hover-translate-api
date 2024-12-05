import { IsNotEmpty, IsString } from "class-validator";

export class TranslateRequestDto {
  @IsString()
  @IsNotEmpty()
  input: string;

  @IsString()
  @IsNotEmpty()
  sourceLocale: string;

  @IsString()
  @IsNotEmpty()
  targetLocale: string;
}
