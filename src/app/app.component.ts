import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color:string
  height:number
  width:number
  align:string
  constructor(){
    this.color="text-dark"
    this.height=200
    this.width=200
    this.align="text-left"
  }
  red(){
    this.color="text-danger"

  }
  green(){
    this.color="text-success"
  }
  blue(){
    this.color="text-primary"
  }
  black(){
    this.color="text-dark"
  }
  increment(){
    this.width+=10;
    this.height+=10;

  }
  decrement(){
    this.width-=10;
    this.height-=10;
  }
  alignLeft(){
    this.align="text-start"
  }
  alignRight(){
    this.align="text-end"
  }
  alignCenter(){
    this.align="text-center"
  }


}
