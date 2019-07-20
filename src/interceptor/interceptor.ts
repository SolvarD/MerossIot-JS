import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../app/models/user';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private user: User) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let modified = request.clone({
            setHeaders: {
                //"Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
                //"Access-Control-Allow-Headers": "x-requested-with, content-type",
                //'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + (User.token || ''),
                'Content-Type': 'application/json',
                'vender': 'Meross',
                'AppVersion': '1.3.0',
                'AppLanguage': 'FR',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Origin': '*://*/*',
                'Allow': 'POST, GET, OPTIONS, PUT, DELETE'
                //'User-Agent': 'okhttp/ 3.6.0',

            }
        });

        return next.handle(modified).pipe(
            map((event: HttpEvent<any>) => {
                //if (event instanceof HttpResponse) {
                //    console.log('event--->>>', event);
                //}
                return event;
            }));
    }

}