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
import {TreeModule} from 'primeng/tree';
import {ButtonModule} from 'primeng/button';
import { AddFolderComponent } from './add-folder/add-folder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AddFolderComponent } from './add-folder/add-folder.component';
// import {TreeNode} from 'primeng/api';
import { DialogModule } from 'primeng/dialog'
import { ImportsModule } from './imports';
@NgModule({
  declarations: [
    AppComponent,
    // AddFolderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
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
    // AddFolderComponent,
    HttpClientModule,
    TreeModule,
    DialogModule,ImportsModule
  ],

  exports: [
    FilesReaderComponent,
    VideoPlayerComponent,
    FilesTreeComponent,
    //AddFolderComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
