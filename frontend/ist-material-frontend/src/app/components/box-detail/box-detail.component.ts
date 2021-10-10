import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ItemsService } from 'src/app/services/items.service';
import { ListService } from 'src/app/services/list.service';
import { qrCode } from 'src/global/qrCode';
import { Box } from 'src/models/box';
import { BoxList } from 'src/models/BoxList';
class UpdateItem{
  constructor(
    public id: string,
    public box_id: null){
    }
}
class UpdateList{
  constructor(
    public item_name: string,
    public done: string | null,
    public inbox: string | null,
    public missing: string | null,
    public buying: string | null,
    public item_id: string | null,
    public box_id: string | null){
  }
}
@Component({
  selector: 'app-boxes-item',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss']
})
export class BoxDetailComponent implements OnInit {

  /**
   * fetched box variable and box id from the url
   */
  box!: Box;
  boxId: string = this.activatedRoute.snapshot.params.id;

  // wich backend url should be used
  url =  this.codeUrl.qrCodeUrl;
  error: string = "";
  
  constructor(private boxesService: BoxesServiceService,
              private activatedRoute: ActivatedRoute,
              private codeUrl: qrCode,
              private itemService: ItemsService,
              private location: Location,
              private AuthService: AuthService,
              private listService: ListService) { }

  ngOnInit(): void {
    //initialize function
    this.getBox();
  }

  // gets the box and throughs an error if it couldnt 
  getBox(){
    this.boxesService.getBoxById(this.boxId).subscribe((data: Box) => {
       this.box = data
       console.log(this.box)
    },
    (error) => {
      this.error = error.error;
    } )
  }

  // toggle add item
  display = false;
  addItem() {
    this.display = !this.display;
  }

  UpdateListModel!: UpdateList
  deleteItemFromBoxModel!: UpdateItem 
  onSubmit(item_id: string, item_name: string){
    if(this.box.usage === 'borrowed'){
      window.alert("Cant delete this item from the box, because its already been borrowed")
    }else{
      this.deleteItemFromBoxModel= new UpdateItem(item_id, null);
      this.UpdateListModel = new UpdateList(item_name, null, null, null, null, null, this.boxId)
      this.listService.changeListByBoxAndItemName(this.boxId, item_name, this.UpdateListModel).subscribe((data: BoxList)=>{
        // console.log(data)
        this.itemService.changeItemFromBox(this.deleteItemFromBoxModel).subscribe(data=>{
          window.location.reload()
        })
      })
    }
    
  }
   
  // go back one tab
   goBack(){
    this.location.back();
  }

  isAdmin(){
    return this.AuthService.getUserRole() === 'ADMIN'
  }
}