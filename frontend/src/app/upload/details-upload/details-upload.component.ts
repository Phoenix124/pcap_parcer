import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: string;

  constructor() { }

  ngOnInit() {
    this.fileUpload = this.fileUpload.slice(1,-1).replace(/[\'\"\[\\\]]/g,"").replace(/(, )/,'\n');
    console.log(typeof this.fileUpload);
  }


}
