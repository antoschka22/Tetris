import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global/globals';
import { user } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url =  this.globals.backendUri;

  constructor(private globals: Globals, private http: HttpClient) { }

  getUserById(id: string){
    return this.http.get<user>(this.Url + '/users/' + id)
  }
}
