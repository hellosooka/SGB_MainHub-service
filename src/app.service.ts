import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private rolesService: RolesService,
    private userService: UsersService,
    private authService: AuthService,
  ) { }

  async initializeProject() {
    if (await this.checkPreviousAttempt()) {
      throw new HttpException(
        'Project already initialized',
        HttpStatus.CONFLICT,
      );
    } else {
      await this.createRoles();
      await this.createAdmin();
    }
  }

  private async checkPreviousAttempt() {
    const user = await this.userService.getUserByEmail(
      'leo.zemtsoff@gmail.com',
    );
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  private async createRoles() {
    await this.rolesService.createRole({
      value: 'USER',
      description: 'This is default role',
    });
    await this.rolesService.createRole({
      value: 'ADMIN',
      description: 'This is main role',
    });
  }

  private async createAdmin() {
    await this.authService.register({
      nickname: 'ADMIN',
      email: 'leo.zemtsoff@icloud.com',
      password: `${process.env.ADMIN_PASSWORD}`,
    });
    const admin = await this.userService.getUserByEmail(
      'leo.zemtsoff@icloud.com',
    );
    return await this.userService.changeUserRole({
      value: 'ADMIN',
      userId: admin.id,
    });
  }
}
