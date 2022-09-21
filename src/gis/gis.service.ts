import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Repository } from 'typeorm';
import { gisEntity } from './gis.dto';

@Injectable()
export class GisService {
    constructor(@InjectRepository(gisEntity) private gisRepo: Repository<gisEntity>) { }

    // getData
    findAll() {
        return this.gisRepo.find();
    }

    // PostData
    async create(gisData) {
        const res = this.gisRepo.insert(gisData);
        console.log(res);

        return await this.gisRepo.insert(gisData);
    }

    // postuploadData
    async saveFile(file: any): Promise<any> {
        const csv = require('csvtojson')
        const csvFilePath = process.cwd() + '/' + file.path;
        let c;
        // let locationData = await csv().fromFile(csvFilePath).then(function (data)
        await csv().fromFile(csvFilePath).then(function (data) {
            c = data
            console.log(c)
        });
        // console.log(locationData)
        var location;
        for (var i = 0; i < c.length; i++) {
            let newGeom: Point = {
                type: 'Point',
                coordinates: [c[i]['lon'], c[i]['lat']]
            }
            console.log(newGeom)
            let newData = {
                id: c[i]['id'],
                lon: c[i]['lon'],
                lat: c[i]['lat'],
                City_Name: c[i]['City_Name'],
                //goem:"ST_MakePoint(" + parsedCsv.data[0]['log'] + ", " + parsedCsv.data[0]['lat']+","+parsedCsv.data[0]['alt']+")",
                geom: newGeom
            }
            console.log(newData.lon)
            location = await this.gisRepo.save(newData)
        }

        return location;
    }
}
