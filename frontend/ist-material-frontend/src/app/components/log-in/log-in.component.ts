import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/browser';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRequest } from 'src/models/AuthRequest';

class loginModel implements AuthRequest{
  constructor(
    public username: string,
    public password: string
  ){

  }
}
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  @ViewChild('f') form:any
  error: string =""

  allowedFormats = [ BarcodeFormat.QR_CODE];

  constructor(private location: Location,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }


  loginModel: loginModel = new loginModel("", "");
  onSubmit(){
    if(this.form.valid){
      this.authService.loginUser(this.loginModel, true).subscribe(data=>{
        this.location.back()
      },
      (error) => {
        window.alert(error.error);
      })
    }
  }

  scanUser: boolean = false
  scanMode(){
    this.scanUser = !this.scanUser
  }

  userInfo: any = {};
  propsArr: any;
  scanSuccessHandler(message: string){
    let propsArr = message.split(",");
    propsArr.forEach(s => {
      var [key, value] = s.split(":");
      this.userInfo[key] = value;
    });
    // console.log(this.userInfo)
    this.authService.loginUser(this.userInfo, true).subscribe(data => {
      this.location.back()
    },
    (error) => {
      window.alert(error.error);
    })
  }
}
