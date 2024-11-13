import { ApiProperty } from '@nestjs/swagger';
import { LoginStub } from 'src/stubs/login';

export class LoginResponseDTO {
  @ApiProperty({
    example: LoginStub,
  })
  public readonly data: typeof LoginStub;
}
