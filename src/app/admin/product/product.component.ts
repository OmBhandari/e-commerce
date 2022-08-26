import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: null | string = "";
  product: any;
  formdata: any;
  image = "";
  message ="";  
  categories:any;

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.id = this.id == "0" ? "" : this.id;

    this.api.post("productcategory/list", {}).subscribe((result:any)=>{
      this.categories = result.data;
    });

    if (this.id != "") {
      var reply = this.api.post("product/get", { data: { id: this.id } });
      reply.subscribe((result: any) => {
        this.product = result.data;
        console.log(this.product);
        this.load();
      });
    }

    this.load();

  }

  load() {
    this.formdata = new FormGroup(
      {
        id: new FormControl(this.id),
        name: new FormControl(this.product == null ? "" : this.product.name, Validators.required),
        image: new FormControl(""),
        pcid: new FormControl(this.product == null ? "" : this.product.pcid, Validators.required),
        description: new FormControl(this.product == null ? "" : this.product.description, Validators.required),
        specification: new FormControl(this.product == null ? "" : this.product.specification, Validators.required),
        mrp: new FormControl(this.product == null ? "" : this.product.mrp, Validators.required),
        price: new FormControl(this.product == null ? "" : this.product.price, Validators.required),
      });
  }

  filechanged(event: Event) {
    let element = event.target as HTMLInputElement;
    if (element.files != null) {
      let file = element.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != null) {
          this.image = reader.result.toString();
        }
      }
    }

  }

  onClickSumbit(data: any) {
    data.image = this.image;
    if(data.image == "" && this.id == "")
    {
      this.message = "Please select image.";
      return;
    }
    var reqdata = { "data": data };
    var reply = this.api.post("product/save", reqdata);
    reply.subscribe((result: any) => {
      var status = result.status;
      if (status == "success") {
        this.router.navigate(["./admin/products"]);
      }
      else {
        console.log(result);
      }
    });
  }
}
