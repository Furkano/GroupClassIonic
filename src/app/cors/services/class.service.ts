import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { BaseResponseDto } from '../Dto/responce.model.dto';
import { CreateClassRequest } from '../Requests/createClassRequest';
import { DeleteClassRequest } from '../Requests/deleteClassRequest';
import { GetClassWithCodeRequest } from '../Requests/getClassWithCodeRequest';
import { ApiService } from './api.service';

@Injectable({providedIn: 'root'})
export class ClassService {
    constructor(private apiService:ApiService) { }
    
    createClass(createClassRequest:CreateClassRequest):Observable<BaseResponseDto>{
        return this.apiService.post('/classes',createClassRequest).pipe(map(data=>data));
    }
    deleteClass(id:number):Observable<BaseResponseDto>{
        return this.apiService.delete('/classes/'+id).pipe(map(data=>data));
    }
    getClassWithCode(AlphaNumericCode:string):Observable<BaseResponseDto>{
        return this.apiService.get('/classes/GetClassWithCode/'+AlphaNumericCode).pipe(map(data=>data));
    }
    getClassWithEducationYear(EducationYear:string):Observable<BaseResponseDto>{
        return this.apiService.get('/classes/GetClassWithEducationYear/'+EducationYear).pipe(map(data=>data));
    }
    getUserClass(Userid:number):Observable<BaseResponseDto>{
        console.log(Userid)
        return this.apiService.get('/classes/GetUserClass/'+Userid).pipe(map(data=>data));
    }
    getClassWithId(id:number):Observable<BaseResponseDto>{
        console.log(id)
        return this.apiService.get('/classes/GetClassWithId/'+id).pipe(map(data=>data));
    }
}