import {
	Controller,
	Get,
	Delete,
	Post,
	Put,
	Body,
	Param,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { ChangeRoleDto } from './dto/change-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddGameDto } from './dto/add-game.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@ApiOperation({ summary: 'Creating new user' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	createUser(@Body() dto: CreateUserDto) {
		return this.usersService.createUser(dto);
	}

	@ApiOperation({ summary: 'Getting all users from Database' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Change role to user' })
	@ApiResponse({ status: 200, type: ChangeRoleDto })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	changeRole(@Body() dto: ChangeRoleDto) {
		return this.usersService.changeRole(dto);
	}

	@Post('/game')
	addGame(@Body() dto: AddGameDto) {
		return this.usersService.addGame(dto);
	}

	@ApiOperation({ summary: 'Ban user' })
	@ApiResponse({ status: 200, type: User })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	banUser(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}

	@ApiOperation({ summary: 'Getting user by ID' })
	@ApiResponse({ status: 200, type: User })
	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async getUserById(@Param('id') id: number) {
		return this.usersService.findUserById(id);
	}

	@ApiOperation({ summary: 'Deleting user by ID' })
	@ApiResponse({ status: 200, type: User })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete('/:id')
	async deleteUserById(@Param('id') id: number) {
		return this.usersService.deleteUser(id);
	}

	@ApiOperation({ summary: 'Updating user by ID' })
	@ApiResponse({ status: 201, type: User })
	@Put()
	async updateUserById() { }
}
