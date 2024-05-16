import { Component, Input, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgApiService, VgCoreModule } from "@videogular/ngx-videogular/core"
import { VgControlsModule } from "@videogular/ngx-videogular/controls"
import { VgOverlayPlayModule } from "@videogular/ngx-videogular/overlay-play"
import { VgBufferingModule } from "@videogular/ngx-videogular/buffering"

// let videoSrc : any;

// async function main(): Promise<void> {
//   const requestOptions = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/octet-stream' },
//     // mode: "no-cors"

//     // body: JSON.stringify({ title: 'Fetch POST Request Example' })
//   };
//   const response = await fetch('https://localhost:7288/api/Disk/DownloadDiskFile?fileName=big_buck_bunny_720p_1mb.mp4', requestOptions);
//   videoSrc = await response.url;
//   console.log(videoSrc)
// };

// main()

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})

export class VideoPlayerComponent implements OnInit {
  @Input() externalSource: string | undefined;
  videosrc: string | undefined;
  preload: string = 'auto';
  api: VgApiService = new VgApiService;

  async ngOnInit() {
    console.log(this.externalSource)
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/octet-stream' },
      // mode: "no-cors"

      // body: JSON.stringify({ title: 'Fetch POST Request Example' })
    };

    // let results = await fetch('https://localhost:7288/api/Disk/DownloadDiskFile?fileName=big_buck_bunny_720p_1mb.mp4', requestOptions);
    // this.videosrc = results.url;
    this.videosrc = this.externalSource;
      // this.api.registerMedia.
  }

  onPlayerReady(source: VgApiService) {
    this.api = source;

    console.log("onPlayerReady");

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.autoplay.bind(this)
    )
  }

  autoplay() {
    console.log("play");
    this.api.play();
  }
}
