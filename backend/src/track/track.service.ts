import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from "./entity/track.entity";
import { Repository, ILike } from "typeorm";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { FileService, FileType } from "../file/file.service";



@Injectable()
export class TrackService{

    constructor ( 
        @InjectRepository(Track) 
        private trackRepository: Repository<Track>,
        private fileService: FileService
    ){}


    
    async create(dto:CreateTrackDto, picture, audio): Promise<Track> {
        const picturePath = this.fileService.create(FileType.IMAGE, picture);
        const audioPath = this.fileService.create(FileType.AUDIO, audio);
        const track = await this.trackRepository.create({...dto, listens: 0, picture: picturePath, audio: audioPath});
        return this.trackRepository.save(track);
    }


    
    async getAll(offset: number, limit: number): Promise<Track[]>  {
        return await this.trackRepository.find({  
            skip: offset,
            take: limit,
            order: {
                id: 'DESC'
            }
        });
    }



    async getOne(id: number): Promise<Track | null>  {
        const track = await this.trackRepository.findOneBy({id});
        return track;
    }



    async update(id:number, dto: UpdateTrackDto): Promise<Track | null> {
        await this.trackRepository.update(id,{...dto});
        return this.getOne(id);
    }


    
    async delete(id: number): Promise<boolean> {
        const result = await this.trackRepository.delete(id);
        return result.affected ? true : false;
    }



    async search(
        query: string,
        limit: number,
        offset: number
    ): Promise<Track[]> {
        return this.trackRepository.find({
            where: [
                { name: ILike(`%${query}%`) },
                { artist: ILike(`%${query}%`) }
            ],
            skip: offset,
            take: limit,
        });
    }
}