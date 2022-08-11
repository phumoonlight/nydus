import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkController } from './link.controller';
import { LinkModelDefinition } from './link.schema';
import { LinkService } from './link.service';

const ModelModule = MongooseModule.forFeature([LinkModelDefinition]);

@Module({
  imports: [ModelModule],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService, ModelModule],
})
export class LinkModule {}
