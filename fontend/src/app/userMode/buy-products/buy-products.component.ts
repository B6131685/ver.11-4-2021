import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { cartsType } from 'src/app/cart.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-buy-products',
  templateUrl: './buy-products.component.html',
  styleUrls: ['./buy-products.component.css']
})
export class BuyProductsComponent implements OnInit {

  @Input() item: any;
  cart: cartsType = [];
  show: boolean = true;
  price: number =0;

  constructor(private cs: CartService) { }

  ngOnInit(): void {
  }

  addtoCart(){
    console.log("add new product"+this.item)
    
    this.item.quantity -=1;
    if(this.item.quantity == 0){
      this.show = !this.show;
    }
    this.cs.getFromBuy(this.item);
    
  }

}
