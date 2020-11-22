import { Member } from './member.model';

export class Class{
    id:number;
    createdAt:Date;
    modifiedAt:Date;
    name:string;
    alphaNumericCode:string;
    educationYear:string;
    members:Member[];
}