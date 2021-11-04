import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { cartsType } from 'src/app/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { BookService } from 'src/app/services/book.service';
import { FormControl, FormGroup, Validators} from '@angular/forms'
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
  
  amount = new FormControl(0)

  constructor(private cs: CartService, private BookService:BookService) { }

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

  updateMinusStock(){
    //console.log(this.item.name+"--> newQ = "+this.newQ);
    
    this.item.quantity = this.item.quantity - Number(this.amount.value);

    try {
      this.BookService.updateBook(this.item).subscribe(
        data => {
          //this.products = data;
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }
  
  buy(){
    console.log(this.item);
    console.log("จำนวนสินค้า "+this.amount.value);

    if(this.amount.value == 0){
      alert('คุณต้องสั่งซื้อตั้งแต่ 1 ชิ้น ขึ้นไป')
    }else{
      this.updateMinusStock();
    }
  }


}
