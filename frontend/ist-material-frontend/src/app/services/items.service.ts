import { Injectable } from '@angular/core';
import { Item } from 'src/models/items';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global/globals';
import { ItemWithBoxName } from 'src/models/itemWithBoxName';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  Url =  this.globals.backendUri;
  
  constructor(private http: HttpClient, private globals: Globals) { }
  
  // Get
  getItemById(id: string){
    return this.http.get<Item>(this.Url + "/items/" + id);
  }
  getAllItems(){
    return this.http.get<Item[]>(this.Url + "/items")
  }
  getItemsWithBoxName(offset: number, limit: number){
    return this.http.get<ItemWithBoxName[]>(this.Url + "/items/detail?offset="+offset+"&limit="+limit)
  }
  getItemWithBoxNameById(id: string){
    return this.http.get<ItemWithBoxName>(this.Url + "/items/detail/" + id)
  }
  getAmountOfItem(){
    return this.http.get<number>(this.Url + "/items/amount")
  }
  getItemsOutsideOfBox(){
    return this.http.get<Item[]>(this.Url + "/items/withoutBox")
  }
  getItemByItemNameAndBoxId(item_name: string, box_id: string){
    return this.http.get<Item>(this.Url + '/items/'+item_name+'/'+box_id)
  }

  // Put
  updateItem(id:string, ItemToUpdate:Item){
    return this.http.put<Item>(this.Url + '/items/' + id, ItemToUpdate)
  }
  changeItemFromBox(ItemToUpdate: any){
    return this.http.put<Item>(this.Url + '/changeBox/' + ItemToUpdate.id, ItemToUpdate)
  }
  deleteItemFromBox(id:number, setNull: null){
    return this.http.put<Item>(this.Url + '/changeBox/' + id, setNull)
  }

  // Post
  addItemInBox(ItemToAdd: Item){
    return this.http.post<Item>(this.Url + "/boxes/" + ItemToAdd.box_id, ItemToAdd);
  }
  addItemWithoutBox(ItemToAdd: Item){
    return this.http.post<Item>(this.Url + '/items/', ItemToAdd)
  }
}
