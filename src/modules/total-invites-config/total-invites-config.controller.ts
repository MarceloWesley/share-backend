import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { TotalInvitesConfigService } from './total-invites-config.service';
import { AuthGuard } from 'src/shared/guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnauthorizedResponseDTO } from 'src/shared/responses';
import { FoundAllTotalInvitesConfigResponseDTO } from './responses';

@ApiBearerAuth()
@ApiTags('Total Invites Config')
@Controller('total-invites-config')
export class TotalInvitesConfigController {
  constructor(
    private readonly totalInvitesConfigService: TotalInvitesConfigService,
  ) {}

  @ApiOperation({
    description: 'find the total invites config',
    summary: 'Find All',
  })
  @ApiResponse({
    description: 'Total invites config response objet ok',
    type: FoundAllTotalInvitesConfigResponseDTO,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized total-invites-config response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll() {
    return await this.totalInvitesConfigService.findAll();
  }
}
