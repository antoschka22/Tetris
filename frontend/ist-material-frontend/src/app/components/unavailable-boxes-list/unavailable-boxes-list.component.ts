import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { Box } from 'src/models/box';

@Component({
  selector: 'app-unavailable-boxes-list',
  templateUrl: './unavailable-boxes-list.component.html',
  styleUrls: ['./unavailable-boxes-list.component.scss']
})
export class UnavailableBoxesListComponent implements OnInit {

  boxes!: Box[]
  boxesLength: number = 0;
  site: string = "unavailable"

  constructor(private boxesService: BoxesServiceService,
              private location: Location) { }

  ngOnInit(): void {
    this.getUnavailableBoxes();
  }

  getUnavailableBoxes(){
    return this.boxesService.getUnavailableBoxes().subscribe((data: Box[])=>{
      this.boxes = data
      this.boxesLength = this.boxes.length
    })
  }

  newBox: boolean= false
  addBox(){
    this.newBox = !this.newBox
  }

  // go back one tab
  navigate(){
    this.location.back();
  }

}
