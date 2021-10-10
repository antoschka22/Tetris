import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global/globals';
import { BoxList } from 'src/models/BoxList';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  Url =  this.globals.backendUri;

  constructor(private http: HttpClient, private globals: Globals) { }

  // GET
  getItemsOfListByBoxId(box_id: string){
    return this.http.get<BoxList[]>(this.Url + '/list/' + box_id);
  }
  getItemByListId(list_id: string){
    return this.http.get<BoxList>(this.Url + '/list/byId/' + list_id);
  }
  getItemsNotStock(){
    return this.http.get<BoxList[]>(this.Url + '/list/notStock');
  }
  getItemsNotStockByBoxId(box_id: string){
    return this.http.get<BoxList[]>(this.Url + '/list/notStock/'+box_id);
  }
  getAmountOfItemsMissing(){
    return this.http.get<number>(this.Url + '/list/notStock/count');
  }

  // post
  postItemById(item: any){
    return this.http.post<BoxList>(this.Url + "/list/addItem", item);
  }

  // Put
  changeList(uuid: string, item: BoxList){
    return this.http.put<BoxList>(this.Url + "/list/" + uuid, item);
  }
  changeListByBoxAndItemName(box_id: string, item_name: string, item: any){
    return this.http.put<BoxList>(this.Url + '/list/searchItem/'+box_id+'/'+item_name, item)
  }

  // Delete
  deleteList(uuid: string){
  return this.http.delete(this.Url + "/list/" + uuid)
  }
  deleteItemInList(uuid: string){
    return this.http.delete(this.Url + "/list/item/" + uuid)
    }
}
