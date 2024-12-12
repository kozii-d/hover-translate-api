export class AuthResponseDto {
  private readonly success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}
