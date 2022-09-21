import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GisController } from './gis.controller';
import { gisEntity } from './gis.dto';
import { GisService } from './gis.service';

@Module({
  imports: [TypeOrmModule.forFeature([gisEntity]),
  MulterModule.register({ dest: './uploads' })],
  controllers: [GisController],
  providers: [GisService]
})
export class GisModule { }
