import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dtos';
import {
  LoginInvalidCredentialsResponseDTO,
  LoginResponseDTO,
  SignUpCustomerResponseDTO,
} from './responses';
import {
  ConflictResponseDTO,
  GoneResponseDTO,
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
} from '@/shared/responses';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Login user with email and password',
    summary: 'Login',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login created response object',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Login unauthorized response object',
    type: LoginInvalidCredentialsResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login bad request response object',
    type: InvalidEntriesResponseDTO,
  })
  @Post('login')
  public async signIn(@Body() signinDto: SignInDTO) {
    return this.authService.signIn(signinDto);
  }

  @ApiOperation({
    description: 'Sign-up Account',
    summary: 'Sign-up',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sign-up created response object',
    type: SignUpCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Sign-up bad request response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Sign-up conflict response object',
    type: ConflictResponseDTO,
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
  @Post('sign-up')
  public async signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }
}
