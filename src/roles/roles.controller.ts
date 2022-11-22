import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @ApiOperation({ summary: 'Creating role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: 200, type: Role })
  @Delete('/:value')
  async deleteRoleByValue(@Param('value') value: string) {
    return this.rolesService.deleteRole(value);
  }

  @ApiOperation({ summary: 'Get all Roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Getting role by Value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  async getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
