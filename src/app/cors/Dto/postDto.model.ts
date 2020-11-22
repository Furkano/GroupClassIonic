import { Class } from '../models/class.model';
import { User } from '../models/user.model';

export class PostDto{
    id:number;
    creatAt:Date;
    modifiedAt:Date;
    userId:number;
    classId:number;
    title:string;
    body:string;
    
    User:User;
    Class:Class;
}