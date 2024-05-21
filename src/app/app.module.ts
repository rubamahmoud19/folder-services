import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PdfViewerModule, HttpClientModule, NgxDocViewerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
