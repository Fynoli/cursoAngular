import {Component, OnInit} from '@angular/core';
import {ProductsService} from "./services/products.service";
import {tap} from "rxjs";
import {Product} from "./interfaces/product.interface";
import {ShoppingCartService} from "./services/shopping-cart.service";

@Component({
  selector: 'app-products',
  template: `<section class="products">
    <app-product
      (addToCartClick)="addToCart($event)"
      [product]="product"
      *ngFor="let product of products">
    </app-product>
  </section>`,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products!: Product[]
  constructor(private productsSvc: ProductsService, private shoppingCartSvc:ShoppingCartService) {
  }

  ngOnInit(): void {
    this.productsSvc.getProducts().pipe(tap((products: Product[]) => {
      this.products=products;
    })).subscribe()
  }

  addToCart(product: Product) {
    this.shoppingCartSvc.updateCart(product);
  }
}
