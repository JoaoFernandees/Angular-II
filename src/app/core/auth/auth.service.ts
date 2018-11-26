import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timingSafeEqual } from 'crypto';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    authenticate(userName: string, password: string) {

      return this.http.post(API_URL + '/user/login', {userName, password})
    }
}
