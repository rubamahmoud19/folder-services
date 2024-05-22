import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
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
import { MessageService} from 'primeng/api';
import { AddFolderComponent } from '../add-folder/add-folder.component';
// import { AddFolderComponent } from '../add-folder/add-folder.component';

@Component({
  selector: 'app-files-tree',
  standalone: true,
  imports: [
    CommonModule,
    VideoPlayerComponent,
    FilesReaderComponent,
    AddFolderComponent,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    StyleClassModule,
    ButtonModule,
    TreeModule,
  ],
  templateUrl: './files-tree.component.html',
  styleUrl: './files-tree.component.css',
  providers: [MessageService]
})

export class FilesTreeComponent {
  passedData: string | undefined;
  companyID: string | undefined;
  public componentChildType: string | undefined;
  @ViewChild('container', { read: ViewContainerRef }) container:
  | ViewContainerRef
  | undefined;
  
  @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef | any;
  @ViewChild("container2", {read: TemplateRef}) contentRef: TemplateRef<any> | any;
  @ViewChild(AddFolderComponent) addFolderComponent!: AddFolderComponent;
  
  files!: TreeNode<any>[];
  selectedFile!: TreeNode;

  
  constructor(private commentService: CommentService, private messageService: MessageService) {}

  ngOnInit() {
    this.commentService.getFiles().then((data) => (this.files = data));
  }

  loadComponent() {}

  displayFolderForm(event: any) {
    this.addFolderComponent.visible = !this.addFolderComponent.visible;
    this.addFolderComponent.folderName = event.label;
    this.addFolderComponent.parentFolderId = event.key;
  }
// collapseAll(){
//     this.files.forEach( node => {
//         this.expandRecursive(node, false);
//     } );
// }

// private expandRecursive(node:TreeNode, isExpand:boolean){
//     node.expanded = isExpand;
//     if (node.children){
//         node.children.forEach( childNode => {
//             this.expandRecursive(childNode, isExpand);
//         } );
//     }
// }

addFile(event: any) {

  console.log(event.label);
  // this.outletRef.clear();
  // this.passedData = undefined;
  // this.outletRef.createEmbeddedView(this.contentRef);

  // console.log("on select", event.node.type)
  // if(event.node.type == "file"){
  //   this.commentService.getDocument(event.node.id)
  //   .then(blob => this.downloadFile(blob, event.node.label))
  //   .catch(error => console.error('Error fetching document:', error));

  // }
  // else {
  //     console.log("errors");
  // }
}

addFolder(event: any){

}

downloadFile(data: Blob, filename: string): void {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

displayFile(data: Blob){
  // var blob = new Blob([data], { type: 'application/octet-stream' });
  let blob:Blob= data as Blob;
  var url = window.URL.createObjectURL(blob);
  // window.open(url);
  window.open(url);
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
