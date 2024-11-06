import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  

  constructor(public menuCtrl: MenuController) { }



  async ngOnInit() {
    this.menuCtrl.enable(false); // Deshabilitar el menú
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true); // Habilitar el menú cuando se salga de la página de login
  }


}
