import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class User {
    public static token: string;
    constructor() { }
}