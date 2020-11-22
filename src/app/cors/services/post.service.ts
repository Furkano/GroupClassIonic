import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseDto } from '../Dto/responce.model.dto';
import { CreatePostRequest } from '../Requests/createPostRequest';
import { UpdatePostRequest } from '../Requests/updatePostRequest';
import { ApiService } from './api.service';

@Injectable({providedIn: 'root'})
export class PostService {
    constructor(private apiService:ApiService) { }
    
    postAsync(createPostRequest:CreatePostRequest):Observable<BaseResponseDto>{
        return this.apiService.post('/posts',createPostRequest).pipe(map(data=>data));
    }
    updatePostAsync(updatePostRequest:UpdatePostRequest):Observable<BaseResponseDto>{
        return this.apiService.put('/posts',updatePostRequest).pipe(map(data=>data));
    }
    deletePostAsync(id:number):Observable<BaseResponseDto>{
        return this.apiService.delete('/posts/'+id).pipe(map(data=>data));
    }
    getClassPosts(Classid:number):Observable<BaseResponseDto>{
        return this.apiService.get('/posts/GetClassPosts/'+Classid).pipe(map(data=>data));
    }
}