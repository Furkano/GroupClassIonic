export class User{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    activationCode?:string;
    profileImageUrl:string;
    schoolNumber:string;
    creatAt:Date;
    modifiedAt:Date;
    userRole:string;
}