import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth.guard.service';
import { HttpTokenInterceptor } from './services/http.token.interceptor';
import { JwtService } from './services/jwt.service';
import { UnAuthGuard } from './services/unauth.guard.service';
import { UserService } from './services/user.service';


@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        ApiService,
        UserService,
        AuthGuard,
        JwtService,
    ],
})
export class CoreModule { }
