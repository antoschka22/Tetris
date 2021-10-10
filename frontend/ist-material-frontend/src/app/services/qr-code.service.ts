import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global/globals';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private http: HttpClient,
              private globals: Globals) { }

  Url = this.globals.backendUri;

  // Get
  createQrCode(text: string){
    return this.http.get(this.Url + "/qrCode/" + text)
  }
}
