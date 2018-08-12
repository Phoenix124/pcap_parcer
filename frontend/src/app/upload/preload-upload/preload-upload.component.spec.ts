import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadUploadComponent } from './preload-upload.component';

describe('PreloadUploadComponent', () => {
  let component: PreloadUploadComponent;
  let fixture: ComponentFixture<PreloadUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
