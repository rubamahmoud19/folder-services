import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as docx from 'docx-preview';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="loadPowerPoint()">Load PowerPoint</button>
      <button (click)="loadWord()">Load Word</button>
      <button (click)="loadPDF()">Load PDF</button>
      <button (click)="loadExcel()">Load Excel</button>
      <button (click)="loadImage()">Load Image</button>
      <button (click)="loadVideo()">Load Video</button>
      <pdf-viewer *ngIf="pdfSrc" [src]="pdfSrc" [render-text]="true" [original-size]="false" style="width: 400px; height: 500px;"></pdf-viewer>
      <div *ngIf="excelData">
        <table>
          <tr *ngFor="let row of excelData">
            <td *ngFor="let cell of row">{{ cell }}</td>
          </tr>
        </table>
      </div>
      <div id="docxContainer"></div>
      <ngx-doc-viewer
        [url]="doc"
        viewer="url"
        style="width:100%;height:50vh;"
        *ngIf="doc"
      >
      </ngx-doc-viewer>
      <img [src]="imageUrl" alt="image" *ngIf="imageUrl" />
      <video [src]="videoUrl" controls *ngIf="videoUrl"></video>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  pdfSrc: string | undefined;
  excelData: any[] | undefined;
  doc: string | undefined;
  imageUrl: string | undefined;
  videoUrl: string | undefined;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  loadPDF(): void {
    this.http.get('http://localhost:3000/pdf', { responseType: 'blob' }).subscribe((response: Blob) => {
      const url = URL.createObjectURL(response);
      this.pdfSrc = url;
    });
  }

  loadExcel(): void {
    this.http.get('http://localhost:3000/xlsx', { responseType: 'arraybuffer' }).subscribe((response: ArrayBuffer) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    });
  }

  loadWord(): void {
    this.http.get('http://localhost:3000/docx', { responseType: 'blob' }).subscribe((response: Blob) => {
      const container = document.getElementById('docxContainer');

      
      if (container) {
        docx.renderAsync(response, container);
      }
    });
  }

  loadImage(): void {
      this.imageUrl =  "http://localhost:3000/jpg"
  }

  loadVideo(): void {
    this.videoUrl = "http://localhost:3000/mp4"
  }

  loadPowerPoint(): void {
    this.doc = "https://docs.google.com/presentation/d/1wdZPoP-u6t-5wbBEovw3GGeAelVFsawY6nWjpO6FyUQ/edit?usp=sharing"
  }
}
