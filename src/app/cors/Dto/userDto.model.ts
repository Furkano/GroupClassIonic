export class UserDto{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    activationCode?:string;
    profileImageUrl:string;
    schoolNumber:string;
    creatAt:Date;
    modifiedAt:Date;
    userRole:string;
    
}