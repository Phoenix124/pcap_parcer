import {Component, Injectable, Input, OnInit} from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
@Injectable()
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  @Input() filename: string;

  constructor(private uploadService: UploadFileService) {
    this.uploadService.getFiles();
  }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files[0];
    this.selectedFiles = event.target.files;
    this.filename = file.name;
    console.log(this.filename);
    console.log(file);
    this.uploadService.serFilename(this.filename);
    console.log(this.uploadService.getFiles());
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
}
