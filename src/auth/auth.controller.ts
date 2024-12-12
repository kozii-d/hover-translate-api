import { Controller, Post, Req, UseGuards } from "@nestjs/common";

import { AuthGuard } from "./auth.guard";
import { AuthenticatedRequest } from "./authenticated-request.interface";
import { AuthResponseDto } from "./dto/auth-response.dto";

@UseGuards(AuthGuard)
@Controller("auth")
export class AuthController {
  @Post("login")
  async login(@Req() request: AuthenticatedRequest): Promise<AuthResponseDto> {
    // todo: add users to the database. Implement user service
    console.log("request.tokenPayload", request.tokenPayload);

    return new AuthResponseDto(true);
  }

  @Post("logout")
  async logout(@Req() request: AuthenticatedRequest): Promise<AuthResponseDto> {
    // todo: remove users from the database. Implement user service
    console.log("request.tokenPayload", request.tokenPayload);

    return new AuthResponseDto(true);
  }
}
