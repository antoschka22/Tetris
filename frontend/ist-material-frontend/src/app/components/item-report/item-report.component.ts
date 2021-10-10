import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ReportService } from 'src/app/services/report.service';
import { Item } from 'src/models/items';
import { Report } from 'src/models/report';

/**
 * classes for adding a report and updating the status
 */
class addReport implements Report{
  constructor(
    public id: string,
    public description: string,
    public item_id: string,
    public repaired: string,
    public repairing: string){
    }
}
class UpdateItem implements Item{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public box_id: string | null,
    public status: string){

    }
}

@Component({
  selector: 'app-item-report',
  templateUrl: './item-report.component.html',
  styleUrls: ['./item-report.component.scss']
})
export class ItemReportComponent implements OnInit {

  /**
   * gets item id from url
   * variable containing the item
   */
  itemId = this.activatedRoute.snapshot.params.id;
  item!: Item
  error:string =''
  @ViewChild('f') form:any

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private location: Location,
              private reportService: ReportService,
              private router: Router) {}

  ngOnInit(): void {
    // initiatializes function getItem
    this.getItem();
  }

  // gets an item by id
  getItem(){
    this.itemService.getItemById(this.itemId).subscribe((data: Item) => {
       this.item = data
    })
  }

  // models for the form
  reportModel: addReport = new addReport("", "", this.itemId, "", "");
  itemModel!: UpdateItem
  /**
   * updates the item status to damage
   * add a new report and then you go back 
   */
  onSubmit(data: NgForm){
    if(this.form.valid){
      this.itemModel = new UpdateItem(this.item.id, this.item.name, this.item.description, null, "damage");
      this.itemService.updateItem(this.itemId, this.itemModel).subscribe();
      this.reportService.addReportItem(this.reportModel).subscribe(() => {
        this.location.back()
      },(error) => {
          error = error
          console.log(error)
     })
    }
  }

  // goes back one tab
  goBack(){
    this.location.back();
  }

  // displays the loading animation after submitting the form
  displayLoadingAnimation = false
  loadingAnimation(){
    this.displayLoadingAnimation = !this.displayLoadingAnimation
  }
}
