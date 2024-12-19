import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';

@Injectable()
export class TotalInvitesConfigService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    try {
      const data = await this.prismaService.config.findMany();
      return { data };
    } catch (err) {
      throw new Error(`Error when fetching configuration data ${err}`);
    }
  }
}
