import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesReaderComponent } from './files-reader/files-reader.component';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VgApiService, VgCoreModule } from "@videogular/ngx-videogular/core"
import { VgControlsModule } from "@videogular/ngx-videogular/controls"
import { VgOverlayPlayModule } from "@videogular/ngx-videogular/overlay-play"
import { VgBufferingModule } from "@videogular/ngx-videogular/buffering";
import { FilesTreeComponent } from './files-tree/files-tree.component'
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    FilesReaderComponent,
    VideoPlayerComponent,
    FilesTreeComponent,
    HttpClientModule
  ],

  exports: [
    FilesReaderComponent,
    VideoPlayerComponent,
    FilesTreeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
