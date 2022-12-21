import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private rolesService: RolesService,
    private userService: UsersService,
  ) { }

  async initializeProject() {
    if (this.checkPreviousAttempt()) {
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
    const roles = await this.rolesService.getAllRoles();
    if (roles.length > 0) {
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
    const user = await this.userService.createUser({
      nickname: 'ADMIN',
      email: 'leo.zemtsoff@icloud.com',
      password: process.env.ADMIN_PASSWORD,
    });
    return await this.userService.changeUserRole({
      value: 'ADMIN',
      userId: user.id,
    });
  }
}
