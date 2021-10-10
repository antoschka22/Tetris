import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global/globals';
import { Report } from 'src/models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  Url =  this.globals.backendUri;

  constructor(private http: HttpClient, private globals: Globals) { }

  // Get
  getReportsByItemId(id: string){
    return this.http.get<Report[]>(this.Url + '/reports/' + id)
  }
  getRepairingReportsByItemId(id: string){
    return this.http.get<Report[]>(this.Url + '/reports/repairing/' + id)
  }
  getAmountOfReports(id: string){
    return this.http.get<Number>(this.Url + '/reports/amount/' + id)
  }

  // Post
  addReportItem(reportToAdd: Report){
    return this.http.post<Report>(this.Url + '/reports', reportToAdd);
  }
  
  // Put
  sendItemForRepair(id: string, reportToSend: Report){
    return this.http.put<string>(this.Url + '/reports/repairing/' + id, reportToSend)
  }
  ItemHasBeenRepaired(id: string, reportToSend: Report){
    return this.http.put<string>(this.Url + "/reports/repaired/" + id, reportToSend)
  }

  // Delete
  deleteReportById(id: string){
    return this.http.delete(this.Url + '/reports/' + id)
  }
}
