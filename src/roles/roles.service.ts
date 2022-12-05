import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) { }

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.create(dto);
    return role;
  }

  async deleteRole(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    role.destroy();
    return role;
  }

  async getAllRoles() {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    if (role) {
      return role;
    }
    throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
  }
}
