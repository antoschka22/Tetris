import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ListService } from 'src/app/services/list.service';
import { Box } from 'src/models/box';
import { BoxList } from 'src/models/BoxList';
// class for the model
class addItemToList{
  constructor(
    public item_id: null,
    public box_id: string,
    public item_name: string){
    }
}
class updateBox{
    constructor(
      public id: string,
      public usage: string,
      public contactperson: string){
      }
}
@Component({
  selector: 'app-box-item-list',
  templateUrl: './box-item-list.component.html',
  styleUrls: ['./box-item-list.component.scss']
})
export class BoxItemListComponent implements OnInit {

  @Input() box!: Box
  @ViewChild('f') form:any;
  boxId: string = this.activatedRoute.snapshot.params.id;

  addItemToList= new addItemToList (null, "", "")
  updateBox: updateBox = new updateBox(this.boxId, "listed", "")

  public items = [{
    item_id: null,
    box_id: "",
    item_name: ""
  }];

  constructor(private activatedRoute: ActivatedRoute,
              private listService: ListService,
              private boxService: BoxesServiceService) { }

  ngOnInit(): void {
  }

  addItem(){
    this.items.push({
      item_id: null,
      box_id: "",
      item_name: ""
    });
  }
  removeItem(i:number){
    this.items.splice(i, 1);
  }
  logValue(){
    if(this.updateBox.contactperson === ''){
      window.alert("Type in a contact person")
    }else{
      this.boxService.changeBox(this.boxId, this.updateBox).subscribe((data: Box)=>{
        // console.log(data)
        this.items.forEach((item)=>{
          this.addItemToList = new addItemToList(null, this.boxId, item.item_name)
          this.listService.postItemById(this.addItemToList).subscribe((data: BoxList)=>{
            // console.log(data)
          })
        })
      })
      setTimeout(()=>{ 
        window.location.reload()
      }, 1000);
    }
  }

  displayLoadingAnimation: boolean = false;
  loadingAnimation(){
    this.displayLoadingAnimation = !this.displayLoadingAnimation
  }
}