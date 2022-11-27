import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
 model={
   name:'',
   store:'',
   shippingAddress:'',
   city:''
 };

  onPickupOrDelivery(b: boolean) {

  }

  onSubmit() {
    console.log("El wacho compro algo")
  }
}
