import { Component, Input, OnInit } from '@angular/core';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ListService } from 'src/app/services/list.service';
import { Box, BoxWithMissingItems } from 'src/models/box';
import { BoxList } from 'src/models/BoxList';

class listModal implements BoxList{
  constructor(
    public id: string,
    public box_id: string,
    public item_name: string,
    public done: string | null,
    public inbox: string | null,
    public missing: string | null,
    public item_id: string,
    public buying: string | null) {
  }
}

@Component({
  selector: 'app-items-restock-modal',
  templateUrl: './items-restock-modal.component.html',
  styleUrls: ['./items-restock-modal.component.scss']
})
export class ItemsRestockModalComponent implements OnInit {

  constructor(private listService: ListService,
              private boxesService: BoxesServiceService) { }

  listModel!: listModal
  @Input() itemsNotOnStock!: BoxList[]
  boxes: BoxWithMissingItems[] = []

  ngOnInit(): void {
    this.getAllBoxes();
  }

  getAllBoxes(){
    this.boxesService.getBoxesWithMissingItems().subscribe((data:BoxWithMissingItems[])=>{
      this.boxes = data
      console.log(this.boxes)
    })
  }


  today: any = new Date();
  buyingItem(item: BoxList){
    if(!item.buying){
      this.listModel = new listModal(item.id, item.box_id, item.item_name, null, null, item.missing, item.item_id, "")
      this.listService.changeList(item.id, this.listModel).subscribe((data:BoxList)=>{
        // console.log(this.listModel)
        item.buying = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
      })
    }else{
      window.alert("Item is already being bought")
    }
    
  }

  showWarning: boolean = false
  warning(){
    this.showWarning = !this.showWarning
  }

}
