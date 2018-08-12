import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {FormUploadComponent} from "./form-upload/form-upload.component";

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient) { }
  filename: string;

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8080/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    console.log(this.filename);
    return this.http.get('http://localhost:8080/getcontentfile/' + this.filename );
  }


  serFilename(value: string) {
    this.filename = value;
  }
}
