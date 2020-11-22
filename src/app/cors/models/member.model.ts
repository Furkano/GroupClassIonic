import { Class } from './class.model';
import { User } from './user.model';

export class Member{
    id:number;
    creatAt:Date;
    modifiedAt:Date;
    classId:number;
    userId:number;
    
    user:User;
    class:Class;
}