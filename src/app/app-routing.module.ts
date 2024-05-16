import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesReaderComponent } from './files-reader/files-reader.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AppComponent } from './app.component';
import { FilesTreeComponent } from './files-tree/files-tree.component';

const routes: Routes = [
  // { path: '', component: AppComponent, pathMatch: "full" },
  { path: 'filesReader', component: FilesReaderComponent, pathMatch: "full" },
  { path: 'videoPlayer', component: VideoPlayerComponent, pathMatch: "full" },
  { path: 'filesTree', component: FilesTreeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
