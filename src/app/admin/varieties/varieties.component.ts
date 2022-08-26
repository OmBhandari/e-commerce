import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-varieties',
  templateUrl: './varieties.component.html',
  styleUrls: ['./varieties.component.css']
})
export class VarietiesComponent implements OnInit {

  id: null | string = "";
  product: any;
  formdata: any;

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.load();
  }


  load() {
    
      var reply = this.api.post("product/get", { data: { id: this.id } });
      reply.subscribe((result: any) => {
        this.product = result.data;
        console.log(this.product);
        this.formdata = new FormGroup(
          {
            id: new FormControl(this.id),
            color: new FormControl("", Validators.required),
            size: new FormControl("", Validators.required),
            mrp: new FormControl(0, Validators.required),
            price: new FormControl(0, Validators.required),
          });
      });
  }

  onClickSumbit(data: any) {
    var reqdata = { data:{id:this.id, variety: data }};
    var reply = this.api.post("product/savevariety", reqdata);
    reply.subscribe((result: any) => {
      var status = result.status;
      this.load();
      if (status == "success") {
      }
      else {
        alert("Something went wrong.");
      }
    });
  }

  deletevariety(variety:any){
    if(confirm("Sure to delete?")){
      this.api.post("product/deletevariety", {data:{id:this.id, variety:variety}}).subscribe((result:any)=>{
        this.load();
      });
    }
  }
}
