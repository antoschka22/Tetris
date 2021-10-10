import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { ReportService } from 'src/app/services/report.service';
import { Item } from 'src/models/items';
import { Report } from 'src/models/report';
/**
 * classes for the form
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

class setRepairing implements Report{
  constructor(
    public id: string,
    public description: string,
    public item_id: string,
    public repairing: string,
    public repaired: string
  ){

  }
}
@Component({
  selector: 'app-item-repair',
  templateUrl: './item-repair.component.html',
  styleUrls: ['./item-repair.component.scss']
})
export class ItemRepairComponent implements OnInit {
  
  // variable from the parent component
  @Input() itemId: any = '';
  reportId: number = this.activatedRoute.snapshot.params.reportId;

  // variables for storing the item, item reports, amount of reports and the selectItems in the checkbox
  item!: Item;
  itemReports: Report[] | undefined;
  amountOfReports: any
  selectedItems: string[] = [];
  error: string= "";
  reportPlaceholder!: Item

  @ViewChild('f') form:any

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private reportService: ReportService,
              private AuthService: AuthService,
              private router: Router) {}


  isUser(){
    // console.log(this.AuthService.getUserRole())
    return this.AuthService.getUserRole() === 'USER'
  }

  isAdmin(){
    return this.AuthService.getUserRole() === 'ADMIN'
  }

  ngOnInit(): void {
    // initializes the function
    this.getItem();
  }

  /**
   * gets an item by the id
   */
  getItem(){
    this.itemService.getItemById(this.itemId).subscribe((data: Item) => {
       this.item = data
      //  console.log(this.item)
      this.getReportsInformation();
    })
  }

  // if item has been fetched
  // fetches the reports of the item and the amount of reports that item has
  getReportsInformation(){
    if(this.item){
      this.reportService.getReportsByItemId(this.item.id).subscribe((data: Report[]) => {
        this.itemReports = data
        // console.log(this.itemReports)
      })
      this.reportService.getAmountOfReports(this.item.id).subscribe((data: Number) => {
        this.amountOfReports = data
        // console.log(this.amountOfReports)
      })
    }else{
      console.log("error")
    }
  }

  
  // gets the report id of the selected checkboxes in the form
  getReportId(e: any, id: string){
    if(e.target.checked){
      // console.log(id + ' Checked')
      this.selectedItems.push(id);
    }else{
      // console.log(id + ' Uncheked')
      this.selectedItems = this.selectedItems.filter(m=>m!=id )
    }
    // console.log(this.selectedItems)
  } 
  
  // models for the forms
  reportModel: setRepairing | undefined
  model: UpdateItem | undefined;
  
  // loops through all the items that where selected and creates and send the form 
  // then the status is changed to repair
  onSubmit(){
    if(!this.isUser() || !this.isAdmin() || this.form.valid){
      for(var i = 0; i <= this.selectedItems.length-1; i++){
        this.reportModel = new setRepairing(this.selectedItems[i], "", "", "", "")
        this.reportService.sendItemForRepair(this.selectedItems[i], this.reportModel).subscribe(data => {
          // console.log(data)
        })
      }
      this.model = new UpdateItem("", this.item.name, this.item.description, this.item.box_id, "repair");
      this.itemService.updateItem(this.itemId, this.model).subscribe(data => {
        // console.log(data)
        window.location.reload();
      }, ((error)=>{
        this.error = error
      }))
    }
  }

  // if you delete the one report set the status to functional
  // delete the selected report
  onSubmitDeleteReport(report_id: string){
    // console.log(this.amountOfReports.amountofreports)
    if(this.amountOfReports.amountofreports == 1 && this.item.status === "damage"){
      this.model = new UpdateItem("", this.item.name, this.item.description, this.item.box_id, "functional");
      this.itemService.updateItem(this.itemId, this.model).subscribe(data => {
      console.log(data)
      }, ((error)=>{
        this.error = error
      }))
      this.reportService.deleteReportById(report_id).subscribe(data => {
        // console.log(data);
        window.location.reload()
      })
    }else{
      this.reportService.deleteReportById(report_id).subscribe(data => {
        // console.log(data);
        window.location.reload()
      })
    } 
  }
}