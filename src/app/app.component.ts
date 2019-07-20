import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as md5 from 'md5';
import { User } from './models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'meross';
    signature: string = '';
    md5Signature = '';
    constructor(private http: HttpClient, private user: User) { }
    SECRET = "23x17ahWarFH6w29";
    nonce: string;

    ngOnInit() {
        this.nonce = this.generateRandomString(16);
        this.LoginMerossIot();
    }
    generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let nonce = '';
        while (nonce.length < length) {
            nonce += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return nonce;
    }

    LoginMerossIot() {
        const MEROSS_URL = "https://iot.meross.com";
        const LOGIN_URL = MEROSS_URL + "/v1/Auth/Login";
        const DEVICE_URL = '/v1/Device/devList';
        let ident = {
            'email': 'xxxx',
            'password': 'xxx',
        };

        //let data = {
        //    'extra': {}, 'model': 'Android,Android SDK built for x86_64', 'system': 'Android',
        //    'uuid': '493dd9174941ed58waitForOpenWifi', 'vendor': 'Meross', 'version': '6.0'
        //}

        let b64Ident = this.encodeParams(ident);
        let timeStamp = new Date().getTime();

        this.signature = this.SECRET + timeStamp + this.nonce + b64Ident;
        this.md5Signature = md5(this.signature);

        const payload = {
            'params': b64Ident,
            'sign': this.md5Signature.toLocaleLowerCase(),
            'timestamp': timeStamp,
            'nonce': this.nonce.toUpperCase()
        }

        this.http.post(LOGIN_URL, payload).subscribe((item) => { console.log(item) })

            //.toPromise().then((response: any) => {
            //    //User.token = response.token
            //    console.log(response)
            //});
    }

    encodeParams(parameters) {
        return btoa(JSON.stringify(parameters));
    }
}
