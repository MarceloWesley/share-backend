import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDTO,
  FindOneUserByEmailDTO,
  UpdateOneUserByIdDTO,
} from './dtos';
import { UsersService } from './users.service';
import { PaginationOptionsDTO } from 'src/shared/dtos/pagination';
import { FindOneUserByIdDTO } from './dtos/find-one-user-by-id.dto';
import {
  CreatedOneUserResponseDTO,
  DeletedOneUserResponseDTO,
  FoundAllUserResponseDTO,
  FoundOneUserResponseDTO,
  UpdatedOneUserResponseDTO,
} from './responses';
import {
  ConflictResponseDTO,
  GoneResponseDTO,
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from 'src/shared/responses';
import { AuthGuard } from 'src/shared/guards';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Create user with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Users response object created',
    type: CreatedOneUserResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized users response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicting users response object',
    type: ConflictResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found users response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.GONE,
    description: 'Invalid code response object',
    type: GoneResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post()
  public async createOne(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.createOne(createUserDTO);
  }

  @ApiOperation({
    description: 'Find all users with pagination',
    summary: 'Find All',
  })
  @ApiResponse({
    description: 'Users response objet ok',
    type: FoundAllUserResponseDTO,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized users response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll(@Query() pagination: PaginationOptionsDTO) {
    return await this.usersService.findAll({ pagination });
  }

  @ApiOperation({
    description: 'Find one user by id',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users response object ok',
    type: FoundOneUserResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized users response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found users response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(@Param() { id }: FindOneUserByIdDTO) {
    return await this.usersService.findOneById(id);
  }

  @ApiOperation({
    description: 'Find one user by email',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users response object ok',
    type: FoundOneUserResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized users response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found users response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get('email/:email')
  public async findOneByEmail(@Param() { email }: FindOneUserByEmailDTO) {
    return await this.usersService.findOneByEmail(email);
  }

  @ApiOperation({
    description: 'Update one user by id',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users response object ok',
    type: UpdatedOneUserResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized users response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found users response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicting users response object',
    type: ConflictResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async updateOneById(
    @Param() { id }: FindOneUserByIdDTO,
    @Body() updateUserDto: UpdateOneUserByIdDTO,
  ) {
    return await this.usersService.updateOneById(id, updateUserDto);
  }

  @ApiOperation({
    description: 'Delete one user by id',
    summary: 'Delete One ',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users response object ok',
    type: DeletedOneUserResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized users response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found users response object',
    type: RecordNotFoundDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteOneById(@Param() { id }: FindOneUserByIdDTO) {
    return await this.usersService.deleteOne(id);
  }
}
