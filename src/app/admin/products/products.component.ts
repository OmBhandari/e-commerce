import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  baseurl = this.api.baseurl;
  products:any=[];
  page : number = 1;
  itemsPerPage = 3;
  totalItems : any;

  constructor(private api:ApiService,private http: HttpClient) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.api.post("product/list", {}).subscribe((result:any)=>{
      this.products = result.data;
      this.page =  0;
      this.totalItems = result.totalproducts;
      console.log(this.products);
    });
  }

  deleteproduct(id:string){
    if(confirm("Sure to delete?")){
      this.api.post("product/delete", {data:{id:id}}).subscribe((result:any)=>{
        this.load();
      });
    }
  }

}
