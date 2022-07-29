import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkController } from './link.controller';
import { LinkModelDefinition } from './link.schema';
import { LinkService } from './link.service';
import { OwnershipService } from '../../common/ownership/ownership.service';

@Module({
  imports: [MongooseModule.forFeature([LinkModelDefinition])],
  controllers: [LinkController],
  providers: [LinkService, OwnershipService],
})
export class LinkModule {}
