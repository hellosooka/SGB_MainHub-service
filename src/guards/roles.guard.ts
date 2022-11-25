import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requriedRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requriedRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const header = req.headers.authorization;
      const bearer = header.split(' ')[0];
      const token = header.split(' ')[1];

      if (bearer != 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthorized user' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return requriedRoles.includes(user.roles.value);
    } catch (e) {
      throw new HttpException('forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
