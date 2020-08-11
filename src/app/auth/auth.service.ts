import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuVbTsQ0wLIu08oiD6xklhaI1p-UPx6no',
      {
        email,
        password,
        returnSecureToken: true,
      }
      ).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuVbTsQ0wLIu08oiD6xklhaI1p-UPx6no',
      {
        email,
        password,
        returnSecureToken: true,
      }
      ).pipe(catchError(this.handleError));
  }

  private handleError(responseError: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!responseError.error || !responseError.error.error) {
      return throwError(errorMessage);
    }
    switch (responseError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'We found no user with this e-mail-address!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid.';
    }
    return throwError(errorMessage);
  }
}
