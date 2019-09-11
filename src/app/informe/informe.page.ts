import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.page.html',
  styleUrls: ['./informe.page.scss'],
})
export class InformePage implements OnInit {

  data: any;

  constructor(
    navParams: NavParams) {
    //console.log(navParams.get('data'));
  }

  ngOnInit() {
  }

}
