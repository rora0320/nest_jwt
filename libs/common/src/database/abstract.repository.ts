import {AbstractDocument} from "@app/common/database/abstract.schema";
import {FilterQuery, Model, Types, UpdateQuery} from "mongoose";
import {Logger, NotFoundException} from "@nestjs/common";
import {NotFoundError} from "rxjs";


export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    protected abstract readonly logger:Logger;

    //생성자
    constructor(protected readonly mongoModel:Model<TDocument>){}

    async create(document:Omit<TDocument, '_id'>): Promise<TDocument>{
        const createdDocument = new this.mongoModel({
            ...document,
            _id: new Types.ObjectId()
        });
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>{
        //lean ? 몽고디비의 도큐먼트가 아니라 자바스크립트의 오브젝트를 도큐먼트로 반환함
        const document = await this.mongoModel.findOne(filterQuery).lean<TDocument>(true);

        if(!document){
            this.logger.warn('filtequery로 조회했을때 문서 없을때',filterQuery);
            throw new NotFoundException('document not found');
        }
        return document;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>,update:UpdateQuery<TDocument>):Promise<TDocument>{
        // findOneAndUpdate()  업데이트 전 도큐먼트를 제공했는데
        // new ? 업데이트 적용 후 객체를 제공함
        const document = await this.mongoModel.findOneAndUpdate(filterQuery,update,{
            new:true
        }).lean<TDocument>(true)

        if(!document){
            this.logger.warn('filtequery로 조회했을때 문서 없을때',filterQuery);
            throw new NotFoundException('document not found');
        }
        return document;
    }

    async findAll(filterQuery:FilterQuery<TDocument>):Promise<TDocument[]>{
        return this.mongoModel.find(filterQuery).lean<TDocument[]>(true);

    }

    async findAndDelete(filterQuery:FilterQuery<TDocument>):Promise<TDocument>{
        return this.mongoModel.findOneAndDelete(filterQuery).lean<TDocument>(true)
    }
}