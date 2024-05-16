import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-files-reader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './files-reader.component.html',
  styleUrl: './files-reader.component.css'
})

export class FilesReaderComponent implements AfterViewInit {
  @Input() externalSource: string | undefined;
  @ViewChild('viewer', { static: true }) viewerRef: ElementRef | undefined;

  ngAfterViewInit(): void {
    console.log("exteranl source from file reader is: ", this.externalSource);
    WebViewer({
      path: "../assets/lib",
      // initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
      // initialDoc: '../assets/Project-proposal.docx'
      // initialDoc: '../assets/Monthly-budget.xlsx'
      // initialDoc: '../assets/Recipe-book.pptx',
      // initialDoc: 'https://localhost:7288/api/Disk/DownloadDiskFile?fileName=webviewer-demo.pdf',
      fullAPI: true,
      enableRedaction: true
    }, this.viewerRef?.nativeElement).then(async (instance) => {
      // console.log(instance);
      // instance.UI.iframeWindow.resizeTo(500, 500);
      // const x = instance.UI.
      // console.log(x);\
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
        // mode: "no-cors"

        // body: JSON.stringify({ title: 'Fetch POST Request Example' })
      };

      if (!this.externalSource) {
        this.externalSource = 'xxxxxxxxxxxxxxxxxxxxxx';
        // https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf
      }

      const response = await fetch(this.externalSource, requestOptions)
      const arrBuf = await response.arrayBuffer();
      const arr = new Uint8Array(arrBuf);
      // console.log(arr);
      const blob = new Blob([arr], { type: 'application/pdf' });
      instance.UI.loadDocument(blob, { filename: 'webviewer-demo.pdf' });
      // instance.UI.iframeWindow.innerHeight.toPrecision(21)
    });
  }

  title = 'files-reader-app';
}
