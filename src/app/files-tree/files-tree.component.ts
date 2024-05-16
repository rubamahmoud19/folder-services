import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { FilesReaderComponent } from '../files-reader/files-reader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CommentService} from './comment.service';

interface FilesNode {
  name: string;
  type: string;
  url: string;
  children?: FilesNode[];
}

interface Folder{
  CompanyId: number;
  ParentId: number;
  SubFolders: Folder[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  type: string;
  url: string;
}

const TREE_DATA: FilesNode[] = [
  {
    name: 'Fruit',
    type: 'folder',
    url: 'null',
    children: [
      {
        name: 'Apple',
        type: 'file',
        url: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
      },
      {
        name: 'Banana',
        type: 'media',
        url: 'https://localhost:7288/api/Disk/DownloadDiskFile?fileName=big_buck_bunny_720p_2gg.mp4',
      },
      {
        name: 'Fruit loops',
        type: 'file',
        url: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
      },
    ],
  },
  {
    name: 'Vegetables',
    type: 'folder',
    url: 'null',
    children: [
      {
        name: 'Green',
        type: 'folder',
        url: 'https://localhost:7288/api/Disk/DownloadDiskFile?fileName=big_buck_bunny_720p_1mb.mp4',
        children: [
          {
            name: 'Broccoli',
            type: 'media',
            url: 'https://localhost:7288/api/Disk/DownloadDiskFile?fileName=big_buck_bunny_720p_1mb.mp4',
          },
          {
            name: 'Brussels sprouts',
            type: 'file',
            url: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
          },
        ],
      },
      {
        name: 'Orange',
        type: 'folder',
        url: 'null',
        children: [
          {
            name: 'Pumpkins',
            type: 'file',
            url: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
          },
          {
            name: 'Carrots',
            type: 'media',
            url: 'https://localhost:7288/api/Disk/DownloadDiskFile?fileName=big_buck_bunny_720p_1mb.mp4',
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-files-tree',
  standalone: true,
  imports: [
    CommonModule,
    VideoPlayerComponent,
    FilesReaderComponent,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    StyleClassModule,
    ButtonModule
  ],
  templateUrl: './files-tree.component.html',
  styleUrl: './files-tree.component.css',
})

export class FilesTreeComponent {
  public loadComponentChild: boolean | undefined;
  public componentChildType: string | undefined;
  passedData: string | undefined;
  @ViewChild('container', { read: ViewContainerRef }) container:
    | ViewContainerRef
    | undefined;
  // @ViewChild('container2', { read: ViewContainerRef }) container2:
  //   | ViewContainerRef
  //   | undefined;
  @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef | any;
  @ViewChild("container2", {read: TemplateRef}) contentRef: TemplateRef<any> | any;

  private _transformer = (node: FilesNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      type: node.type,
      url: node.url,
    };
  };

  private baseUrl = 'https://localhost:44361/api/';

  constructor(private commentService: CommentService) {
    debugger
    this.commentService.getFolders().subscribe((x)=>{
      debugger
      this.dataSource.data = x;

    });
  }
  


  // ngAfterContentInit() {
  //   this.outletRef.createEmbeddedView(this.contentRef);
  // }

  createFolder(node: any) {
    // console.log(process.env['TEST'])
  }

  loadComponent(node: any) {
    // this.container2?.detach()
    // this.container2?.clear();
    // this.container2?.remove()
    // console.log(this.container2?.length)
    // this.container2?.createEmbeddedView

    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);

    console.log(node);
    this.loadComponentChild = false;
    this.componentChildType = undefined;
    this.passedData = undefined;

    this.loadComponentChild = true;

    if (node?.type == 'media') {
      this.componentChildType = 'media';
      this.passedData = node.url;
    } else {
      this.componentChildType = 'file';
      this.passedData = node.url;
    }
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
