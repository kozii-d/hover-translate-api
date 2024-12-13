import { Controller, Post, Req, UseGuards } from "@nestjs/common";

import { UserService } from "../user/user.service";
import { AuthGuard } from "./auth.guard";
import { AuthenticatedRequest } from "./authenticated-request.interface";
import { AuthResponseDto } from "./dto/auth-response.dto";

@UseGuards(AuthGuard)
@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Post("login")
  async login(@Req() request: AuthenticatedRequest): Promise<AuthResponseDto> {
    const { tokenPayload } = request;

    await this.userService.createOrUpdate({
      googleId: tokenPayload.sub,
      email: tokenPayload.email,
      emailVerified: tokenPayload.email_verified,
      name: tokenPayload.name,
      givenName: tokenPayload.given_name,
      familyName: tokenPayload.family_name,
      picture: tokenPayload.picture,
    });

    return new AuthResponseDto(true);
  }

  @Post("logout")
  async logout(@Req() request: AuthenticatedRequest): Promise<AuthResponseDto> {
    const { tokenPayload } = request;

    await this.userService.logoutByGoogleId(tokenPayload.sub);

    return new AuthResponseDto(true);
  }
}
