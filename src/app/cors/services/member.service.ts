import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseDto } from '../Dto/responce.model.dto';
import { AddMemberRequest } from '../Requests/add.member.request';
import { ApiService } from './api.service';

@Injectable({providedIn: 'root'})
export class MemberService {
    constructor(private apiService:ApiService) { }
    
    addMemberAsync(addMemberRequest:AddMemberRequest):Observable<BaseResponseDto>{
        return this.apiService.post('/members',addMemberRequest).pipe(map(data=>data));
    }
    deleteMemberAsync(id:number):Observable<BaseResponseDto>{
        return this.apiService.delete('/members/'+id).pipe(map(data=>data));
    }
    getClassMembersAsync(Classid:number):Observable<BaseResponseDto>{
        return this.apiService.get('/members/GetClassMembers/'+Classid).pipe(map(data=>data));
    }
}