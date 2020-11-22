export class BaseResponseDto{
    hasError:boolean;
    errors:string[]=[];
    Total:number;
    statusCode:number;
    Data:any;
}