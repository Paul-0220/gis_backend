import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Point } from 'geojson';

@Entity({ name: "Gis_table" })

export class gisEntity {
    @PrimaryGeneratedColumn()
    loc_id: number;

    @Column({

    })
    id: number

    @Column({
        type: "decimal",
        nullable: true
    })
    lat: number;

    @Column({
        type: "decimal",
        nullable: true
    })
    lon: number;

    @Column({
        type: "varchar",
        name: "City_Name",
        nullable: true
    })
    City_Name: string;

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'point',
        srid: 4326,
        nullable: true
    })

    geom: Point;

}
