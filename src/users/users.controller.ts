import {
	Controller,
	Get,
	Delete,
	Post,
	Put,
	Body,
	Param,
	UseGuards,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { ChangeUserRoleDto } from './dto/change-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddGameDto } from './dto/add-game.dto';
import { Game } from 'src/games/games.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeUserDto } from './dto/change-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@ApiOperation({ summary: 'Creating new user' })
	@ApiResponse({ status: 200, type: User })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	createUser(@Body() dto: CreateUserDto) {
		return this.usersService.createUser(dto);
	}

	@ApiOperation({ summary: 'Getting user by ID' })
	@ApiResponse({ status: 200, type: User })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get('/:id')
	async getUserById(@Param('id') id: number) {
		return this.usersService.getUserById(id);
	}

	@ApiOperation({ summary: 'Deleting user by ID' })
	@ApiResponse({ status: 200, type: User })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete('/:id')
	async deleteUserById(@Param('id') id: number) {
		return this.usersService.deleteUser(id);
	}

	@ApiOperation({ summary: 'Getting all users from Database' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Change role to user' })
	@ApiResponse({ status: 200, type: ChangeUserRoleDto })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	changeUserRole(@Body() dto: ChangeUserRoleDto) {
		return this.usersService.changeUserRole(dto);
	}

	@ApiOperation({ summary: 'Change role to user' })
	@ApiResponse({ status: 200, type: AddGameDto })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/game')
	addGameToUser(@Body() dto: AddGameDto) {
		return this.usersService.addGameToUser(dto);
	}

	@Get('/:nickname/data')
	getUserDataByNickname(@Param('nickname') nickname: string) {
		return this.usersService.getUserByNickname(nickname);
	}

	@UseInterceptors(FileInterceptor('image'))
	@Roles('ADMIN', 'USER')
	@UseGuards(RolesGuard)
	@Post('/:email/image')
	addUserImage(@Param('email') email: string, @UploadedFile() image: object) {
		return this.usersService.addUserImage(email, image);
	}

	@ApiOperation({ summary: 'Ban user' })
	@ApiResponse({ status: 200, type: User })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	banUser(@Body() dto: BanUserDto) {
		return this.usersService.banUser(dto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/:id/unban')
	unbanUser(@Param('id') id: number) {
		return this.usersService.unbanUser(id);
	}
}
