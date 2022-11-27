import { Injectable } from '@angular/core';
import {Product} from "../interfaces/product.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products : Product[] = []

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get cartAction$() : Observable<Product[]>{
    return this.cartSubject.asObservable();
  }
  get quantiyAction$() : Observable<number>{
    return this.quantitySubject.asObservable();
  }
  get totalAction$() : Observable<number>{
    return this.totalSubject.asObservable();
  }

  updateCart(product:Product){
    this.addToCart(product);
    this.calcTotal();
    this.quantityProducts();
  }

  private addToCart(product:Product){
    const productInCart=this.products.find(({id}) => id==product.id);
    if(productInCart){
      productInCart.qty+=1;
    }else{
      this.products.push({... product, qty:1});
    }
    this.cartSubject.next(this.products);
  }

  private quantityProducts(){
    const quantity = this.products.reduce((acum,prod)=>acum+=prod.qty,0);
    this.quantitySubject.next(quantity);
  }

  private calcTotal(){
    const total = this.products.reduce((acum,prod)=>acum+=prod.price*prod.qty,0);
    this.totalSubject.next(total);
  }
}
