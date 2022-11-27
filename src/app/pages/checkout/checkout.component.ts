import {Component, OnInit} from '@angular/core';
import {DataService} from "../products/services/data.service";
import {delay, switchMap, tap} from "rxjs";
import {Store} from "../../shared/interfaces/store.interface";
import {NgForm} from "@angular/forms";
import {Details, Order} from "../products/interfaces/order.interface";
import {Product} from "../products/interfaces/product.interface";
import {ShoppingCartService} from "../products/services/shopping-cart.service";
import {Router} from "@angular/router";
import {ProductsService} from "../products/services/products.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
 model={
   name:'',
   store:'',
   shippingAddress:'',
   city:''
 };
 cart: Product[]=[];
 stores: Store[] = [];
 isDelivery = false;
  constructor(private dataSvc: DataService, private shoppingCartSvc: ShoppingCartService,
              private router: Router, private productSvc: ProductsService) {
    this.checkIfCartIsEmpty();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(b: boolean) {
    this.isDelivery=b;
  }

  onSubmit({value: formData}: NgForm) {
    const data: Order = {
      ... formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
      .pipe(
        tap(res => console.log('order ->',res)),
          switchMap(({id:orderId})=>{
            const details=this.prepareDetails();
            return this.dataSvc.saveDetailsOrder({details,orderId});
          }),
          tap(() => this.router.navigate(['/checkout/thank-you-page'])),
          delay(2000),
          tap(()=> this.shoppingCartSvc.resetCart())
        ).subscribe();
  }

  private prepareDetails(): Details[]{
    const details: Details[]=[];
    this.cart.forEach(product=>{
      const {id:productId, name:productName, qty:quantity, stock}=product;
      const updateStock = (stock - quantity);
      this.productSvc.updateStock(productId,updateStock).pipe().subscribe();
      details.push({productId,productName,quantity});
    });
    return details;
  }

  private getDataCart(){
    this.shoppingCartSvc.cartAction$.pipe(tap((products:Product[])=>this.cart=products)).subscribe();
  }

  private getCurrentDay(): string{
    return new Date().toLocaleDateString();
  }

  private getStores(){
    // TODO:Desuscribirse de un observable
    this.dataSvc.getStores()
      .pipe(tap((stores:Store[])=> this.stores=stores))
      .subscribe()
  }

  private checkIfCartIsEmpty(){
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products)=>{
          if(Array.isArray(products) && !products.length){
            this.router.navigate(['/products']);
          }
        })
      ).subscribe();
  }
}
