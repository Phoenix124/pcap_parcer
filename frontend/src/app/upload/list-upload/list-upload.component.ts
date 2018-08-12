import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  fileUploads: string = '';
  isLoader: boolean = false;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;
    if (enable) {
      this.isLoader = true;
      this.uploadService.getFiles()
        .subscribe(
          files =>{ console.log(files);this.fileUploads = files; this.isLoader = false;},
          error => console.log(error),
          () => this.isLoader = false
        );
    }
  }
}
