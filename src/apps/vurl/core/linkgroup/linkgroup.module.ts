import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkGroupController } from './linkgroup.controller';
import { LinkGroupModelDefinition } from './linkgroup.schema';
import { LinkGroupService } from './linkgroup.service';

@Module({
  imports: [MongooseModule.forFeature([LinkGroupModelDefinition])],
  controllers: [LinkGroupController],
  providers: [LinkGroupService],
})
export class LinkGroupModule {}
