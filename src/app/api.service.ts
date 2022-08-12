import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:8081/";

  constructor(private http:HttpClient) { }

  post(url:string, data:any){
    const headers = {'Content-type':'application/json'};
    const body = JSON.stringify(data);
    return this.http.post(this.baseurl + url, body, {'headers':headers});

  }
}
