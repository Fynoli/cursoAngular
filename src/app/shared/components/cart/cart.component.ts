import { Component } from '@angular/core';
import {ShoppingCartService} from "../../../pages/products/services/shopping-cart.service";

@Component({
  selector: 'app-cart',
  template: `<ng-container *ngIf="{total:total$ | async, quantiy:quantity$ | async} as dataCart">
    <ng-container *ngIf="dataCart.total">
      <mat-icon>shopping_cart</mat-icon>
      {{dataCart.total | currency}}
      ({{dataCart.quantiy}})
    </ng-container>
  </ng-container>`,
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  quantity$ = this.shoppingCartSvc.quantiyAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;


  constructor(private shoppingCartSvc: ShoppingCartService) {}
}
