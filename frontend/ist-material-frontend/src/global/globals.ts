import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  readonly backendUri: string = this.findBackendUrl();

  private findBackendUrl(): string {
    if (window.location.port === '4200' || window.location.port === '8080') {
      // local `ng serve`, backend at localhost:5000
      return window.location.protocol + '//' + window.location.hostname + ':5000/api/v1';
    }else {
      // assume deployed somewhere and backend is available at same host/port as frontend
      return (
        'https://' + 
        window.location.hostname +
        '/api/v1'
      );
    }
  }
}