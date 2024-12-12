import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Google ID token is missing");
    }

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException("Invalid Google ID token");
      }

      request["tokenPayload"] = payload;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException("Invalid Google ID token");
    }

    return true;
  }
  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    }
    return undefined;
  }
}
