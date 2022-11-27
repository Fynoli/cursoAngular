import { Component } from '@angular/core';
import {ShoppingCartService} from "../../products/services/shopping-cart.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  total$ = this.shoppingCartSvc.totalAction$;
  cart$=this.shoppingCartSvc.cartAction$;
  constructor(private shoppingCartSvc: ShoppingCartService){

  }
}
