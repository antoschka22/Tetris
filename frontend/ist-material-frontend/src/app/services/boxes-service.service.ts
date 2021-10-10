import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Box, BoxWithMissingItems } from 'src/models/box';
import { Globals } from 'src/global/globals';


@Injectable({
  providedIn: 'root'
})
export class BoxesServiceService {

  boxesUrl =  this.globals.backendUri;

  constructor(private http: HttpClient, private globals: Globals) {
  }

  // Get
  getAllBoxes() {
    return this.http.get<Box[]>(this.boxesUrl + '/boxes');
  }
  getBoxById(id: number | string){
    return this.http.get<Box>(this.boxesUrl + "/boxes/" + id);
  }
  getAvailableBoxes(){
    return this.http.get<Box[]>(this.boxesUrl + "/boxes/available");
  }
  getUnavailableBoxes(){
    return this.http.get<Box[]>(this.boxesUrl + "/boxes/unavailable");
  }
  getBorrowedBoxes(){
    return this.http.get<Box[]>(this.boxesUrl + "/boxes/borrowed");
  }
  getListedBoxes(){
    return this.http.get<Box[]>(this.boxesUrl + '/boxes/listed');
  }
  getBoxesWithMissingItems(){
    return this.http.get<BoxWithMissingItems[]>(this.boxesUrl + '/boxes/missing');
  }

  // Post
  addBox(boxToAdd: Box){
    return this.http.post<Box>(this.boxesUrl + '/boxes/add', boxToAdd);
  }

  // Put
  changeBox(id: string, box:any){
    return this.http.put<Box>(this.boxesUrl + '/boxes/' + id, box);
  }
}