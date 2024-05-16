import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
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
import { TreeModule } from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

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
    ButtonModule,
    TreeModule,
  ],
  templateUrl: './files-tree.component.html',
  styleUrl: './files-tree.component.css',
})

export class FilesTreeComponent {
  // public loadComponentChild: boolean | undefined;
  // public componentChildType: string | undefined;
  // passedData: string | undefined;
  // @ViewChild('container', { read: ViewContainerRef }) container:
  //   | ViewContainerRef
  //   | undefined;
  // // @ViewChild('container2', { read: ViewContainerRef }) container2:
  // //   | ViewContainerRef
  // //   | undefined;
  // @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef | any;
  // @ViewChild("container2", {read: TemplateRef}) contentRef: TemplateRef<any> | any;
  files1: TreeNode[] = [];

  // private _transformer = (node: FilesNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //     type: node.type,
  //     url: node.url,
  //   };
  // };

  private baseUrl = 'https://localhost:44361/api/';

  constructor(private commentService: CommentService) {
    // debugger
    // this.commentService.getFolders().subscribe((x)=>{
    //   debugger
    //   this.dataSource.data = x.data;
    //   console.log(this.dataSource.data)
    // });
  }


  ngOnInit() {
    this.commentService.getFiles().then(files => this.files1 = files);
  }

expandAll(){
    this.files1.forEach( node => {
        this.expandRecursive(node, true);
    } );
}

collapseAll(){
    this.files1.forEach( node => {
        this.expandRecursive(node, false);
    } );
}

private expandRecursive(node:TreeNode, isExpand:boolean){
    node.expanded = isExpand;
    if (node.children){
        node.children.forEach( childNode => {
            this.expandRecursive(childNode, isExpand);
        } );
    }
}
  // ngAfterContentInit() {
  //   this.outletRef.createEmbeddedView(this.contentRef);
  // }

  // createFolder(node: any) {
  //   // console.log(process.env['TEST'])
  // }

  // loadComponent(node: any) {
  //   // this.container2?.detach()
  //   // this.container2?.clear();
  //   // this.container2?.remove()
  //   // console.log(this.container2?.length)
  //   // this.container2?.createEmbeddedView

  //   this.outletRef.clear();
  //   this.outletRef.createEmbeddedView(this.contentRef);

  //   console.log(node);
  //   this.loadComponentChild = false;
  //   this.componentChildType = undefined;
  //   this.passedData = undefined;

  //   this.loadComponentChild = true;

  //   if (node?.type == 'media') {
  //     this.componentChildType = 'media';
  //     this.passedData = node.url;
  //   } else {
  //     this.componentChildType = 'file';
  //     this.passedData = node.url;
  //   }
  // }

  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //   (node) => node.level,
  //   (node) => node.expandable
  // );

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   (node) => node.level,
  //   (node) => node.expandable,
  //   (node) => node.children
  // );

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
