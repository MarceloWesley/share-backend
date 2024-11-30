import { AuthService } from '@/modules/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from 'src/modules/auth/dtos';

@Injectable()
export class AuthFixtureService {
  constructor(private readonly authService: AuthService) {}

  public async signUp(dto: SignUpDTO) {
    const response = await this.authService.signUp(dto);

    return response;
  }

  public async signIn({ email, password }: SignInDTO) {
    const response = await this.authService.signIn({ email, password });
    return response;
  }
}
