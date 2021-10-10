import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ReportService } from 'src/app/services/report.service';
import { Item } from 'src/models/items';
import { Report } from 'src/models/report';
// classes for the form
class updateReport implements Report{
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
  selector: 'app-item-repair-all',
  templateUrl: './item-repair-all.component.html',
  styleUrls: ['./item-repair-all.component.scss']
})
export class ItemRepairAllComponent implements OnInit {

  // variables storing the reports of an item, an item and the item of the item
  reportsOfItem: Report[] = []
  item!: Item
  itemId: string = this.activatedRoute.snapshot.params.id;


  constructor(private activatedRoute: ActivatedRoute,
              private reportService: ReportService,
              private router: Router,
              private itemService: ItemsService) { }

  ngOnInit(): void {
    // initialize the functions
    this.getReportsById();
    this.getItemById();
  }


  // get item by id
  getItemById(){
    this.itemService.getItemById(this.itemId).subscribe((data: Item)=>{
      this.item = data
    })
  }

  // get all the reports of the item
  getReportsById(){
    this.reportService.getReportsByItemId(this.itemId).subscribe((data: Report[])=> {
      this.reportsOfItem = data
      console.log(this.reportsOfItem)
    })
  }

  // two models from the form
  updateReport: updateReport | undefined
  model: UpdateItem | undefined

  // loops through all the reports and sets them as repairing
  // sets the status of the item to repair
  onSubmit(){
    for(var i = 0; i < this.reportsOfItem.length; i++){
      this.updateReport = new updateReport(this.reportsOfItem[i].id, "", "", "", "");
      this.reportService.sendItemForRepair(this.reportsOfItem[i].id, this.reportsOfItem[i]).subscribe(data => {})
    }
    this.model = new UpdateItem("", this.item.name, this.item.description, this.item.box_id, "repair");
      this.itemService.updateItem(this.itemId, this.model).subscribe(data => {
        console.log(data)
    })
    setTimeout(()=>{ 
      this.router.navigate(['/items']);
    }, 1000);
    
  }

  // toggle the table with the reports
  displayTable = false
  toggleTable(){
    this.displayTable = !this.displayTable
  }

  // displays a loading animation when submitting
  displayLoadingAnimation = false;
  loadingAnimation(){
    this.displayLoadingAnimation = !this.displayLoadingAnimation
  }

}
