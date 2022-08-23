import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  id: null | string = "";
  category: any;
  formdata: any;
  image = "";
  message ="";

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.id = this.id == "0" ? "" : this.id;
    if (this.id != "") {
      var reply = this.api.post("productcategory/get", { data: { id: this.id } });
      reply.subscribe((result: any) => {
        this.category = result.data;
        console.log(this.category);
        this.load();
      });
    }
    this.load();

  }

  load() {
    this.formdata = new FormGroup(
      {
        id: new FormControl(this.id),
        name: new FormControl(this.category == null ? "" : this.category.name, Validators.required),
        image: new FormControl(""),
        srno: new FormControl(this.category == null ? "" : this.category.srno, Validators.required)
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
    var reply = this.api.post("productcategory/save", reqdata);
    reply.subscribe((result: any) => {
      var status = result.status;
      if (status == "success") {
        this.router.navigate(["./admin/categories"]);
      }
      else {
        alert("Something went wrong.");
      }
    });
  }
}
