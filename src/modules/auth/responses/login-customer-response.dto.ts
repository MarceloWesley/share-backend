import { LoginStub } from '@/stubs/login';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    example: LoginStub,
  })
  public readonly data: typeof LoginStub;
}
