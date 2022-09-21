import { Controller } from '@nestjs/common';
import { Body, Get, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { GisService } from './gis.service';
import { diskStorage } from 'multer';
import { GridFSBucketReadStream } from 'typeorm';

@Controller('gis')
export class GisController {
    serv: any;
    constructor(private readonly gisService: GisService) { }

    // GetController
    @Get()
    getAll() {
        return this.gisService.findAll()
    }

    // PostController
    @Post()
    @HttpCode(201)
    createData(@Body() gisData: any) {
        return this.gisService.create(gisData)
    }

    // @Post('file')
    // @UseInterceptors(FileInterceptor('file'))
    // handleUpload(@UploadedFile() file: Express.Multer.File) {
    //     console.log('file', file)
        
    // }

    // Post for csv....
    @Post('/upload')
    @UseInterceptors(FileInterceptor("csv", {
        storage: diskStorage({
            destination: './csv',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round (Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async uploadCsv(@UploadedFile() file) {
        this.gisService.saveFile(file)
        return 'File uploaded successfully'
    }

}

