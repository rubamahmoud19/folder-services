import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesReaderComponent } from './files-reader.component';

describe('FilesReaderComponent', () => {
  let component: FilesReaderComponent;
  let fixture: ComponentFixture<FilesReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
