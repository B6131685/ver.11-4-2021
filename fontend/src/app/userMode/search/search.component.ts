import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    
  search: any;
  keyword = new FormControl('');
  
  constructor(private ps: BookService) { 
    this.onLoading();
  }

  ngOnInit(): void {
}
  
  onLoading(){
    try{
      this.ps.getProducts().subscribe(
        data => {
          this.search = data
        },
        err => {
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }
  onSearch2(keyword:any){
    try {
      this.ps.getBySearch(keyword).subscribe( //การเรียกใช้ตัว product
        data => {
          this.search = data;
      },
        err => {
          console.log(err)
        });
    }catch (error) {
      console.log(error)
    }
  }

  onSearch1(){
    if(this.keyword.value == ''){
      this.onLoading();
      console.log('1')
    }
    else{
      this.onSearch2(this.keyword.value);
    }
  }
}
