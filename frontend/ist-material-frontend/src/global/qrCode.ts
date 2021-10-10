import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class qrCode {
  readonly qrCodeUrl: string = this.findUrl();

  private findUrl(): string {
    if (window.location.port === '4200' || window.location.port === '8080') {
      return 'http://' + window.location.hostname + ":" + window.location.port;
    }else {
      return (
        'https://'+
        window.location.hostname + 
        '/tetris'
      );
    }
  }
}