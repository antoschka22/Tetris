import { Component, OnInit, ViewChild } from '@angular/core';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { Box } from 'src/models/box';

// FORM Class
class AddBox implements Box {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public usage: string,
    public contactperson: string) {
  }
}
@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.scss']
})

export class AddBoxComponent implements OnInit {
  
  /**
   * Form model 
   */
  model: AddBox = new AddBox("", "", "", "", "");
  @ViewChild('f') form:any;

  constructor(private boxService: BoxesServiceService) { }

  ngOnInit(): void {
  }

  /**
   * If the form is valid submit the model
   * then reset the form and navigate to the created box
   */
  onSubmit(){
    if(this.form.valid){
      this.boxService.addBox(this.model).subscribe((createdBox: Box) => {
        this.form.reset();
        window.location.reload()
      })
    }
  }
  
}
