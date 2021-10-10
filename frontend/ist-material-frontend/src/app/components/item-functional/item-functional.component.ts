import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ReportService } from 'src/app/services/report.service';
import { Item } from 'src/models/items';
import { Report } from 'src/models/report';

/**
 * class for updating an item and report
 */
 class UpdateItem implements Item{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public box_id: string | null,
    public status: string){
    }
}
class updateReport implements Report{
  constructor(
    public id: string,
    public description: string,
    public item_id: string,
    public repaired: string,
    public repairing: string){
    }
}
@Component({
  selector: 'app-item-functional',
  templateUrl: './item-functional.component.html',
  styleUrls: ['./item-functional.component.scss']
})
export class ItemFunctionalComponent implements OnInit {


  itemId: string = this.activatedRoute.snapshot.params.id;
  //variables for the item, amount of report that item has and the details of the reports
  item!: Item;
  amountReport: any;
  reportsOfItem: Report[] =[]

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private location: Location,
              private reportService: ReportService) { }

  ngOnInit(): void {
    // initializes the get functions
    this.getItem();
    this.getAmounOfReports();
    this.getReportsById();
  }

  // get item by id
  getItem(){
    this.itemService.getItemById(this.itemId).subscribe((data:Item)=>{
      this.item = data
    })
  }
  // get the amount of reports that item has
  getAmounOfReports(){
    this.reportService.getAmountOfReports(this.itemId).subscribe((data: any) => {
      this.amountReport = data
      // console.log(this.amountReport)
    })
  }
  // get all the reports of the item
  getReportsById(){
    this.reportService.getRepairingReportsByItemId(this.itemId).subscribe((data: Report[])=> {
      this.reportsOfItem = data
      // console.log(this.reportsOfItem)
    })
  }

  // models for the item and report
  model: UpdateItem | undefined;
  reportModel: updateReport | undefined;

  /**
   * changes the status of the item to functional if there are no other reports
   * loops through all the damages it dealt with and sets them as repaired
   */
  onSubmit(){ 
    /**
     * if the status is repair and the amount of reports is greater equal to 1
     * loop through all the reports you have repaired and set them to the current date
     * and change the status from repair to damage, because the amount of reports is greater equal to 1
     */
    if(this.item.status == 'repair' && this.amountReport.amountofreports >= 1){
      // loops through all the fixed reports 
      for(var i = 0; i < this.reportsOfItem.length; i++){
        // sets the current id to the model
        this.reportModel = new updateReport(this.reportsOfItem[i].id, "", "", "", "");
        this.reportService.ItemHasBeenRepaired(this.reportsOfItem[i].id, this.reportsOfItem[i]).subscribe(data => {})
      }
      // changes the status to damage
      this.model = new UpdateItem("", this.item.name, this.item.description, this.item.box_id, "damage");
      this.itemService.updateItem(this.itemId, this.model).subscribe(data => {
        // console.log(data)
      })
      // alert that the item still has damages
      var r = confirm("Part of this item has been repaired, there are still damages, that's why it cant be changed to functional");
      if (r == true || r == false) {
        this.location.back();
      }
    }else{
      for(var i = 0; i < this.reportsOfItem.length; i++){
        // loops through all the reports and sets them as repaired
        this.reportModel = new updateReport("", "", "", "", "");
        this.reportService.ItemHasBeenRepaired(this.reportsOfItem[i].id, this.reportsOfItem[i]).subscribe(data => {
          // console.log("Item "+this.reportsOfItem[i].id+" has been successfully updated")
        })
      }
      // changes the status to functional
      this.model = new UpdateItem("", this.item.name, this.item.description, this.item.box_id, "functional");
      this.itemService.updateItem(this.itemId, this.model).subscribe(data => {
        this.location.back();
      })
    }
  }
}
