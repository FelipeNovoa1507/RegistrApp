import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userRole: string | null = null;

  constructor(
    private authService: AuthService

  ) { }

  ngOnInit(){
    console.log('hola');

   
  }

}
