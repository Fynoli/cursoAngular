import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  template: `<mat-toolbar color="primary">
    <a class="title" [routerLink]="['/']"><span>My Store</span></a>
                <span class="spacer"></span>
                <app-cart class="mouseHover" (click)="onCartClick()"></app-cart>
            </mat-toolbar>`,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router:Router) {
  }

  onCartClick() {
    this.router.navigate(['/checkout']);
  }
}
