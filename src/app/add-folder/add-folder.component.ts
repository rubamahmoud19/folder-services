import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
// import { ImportsModule } from '../imports';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../files-tree/comment.service';
import { Output, EventEmitter } from '@angular/core';

interface FolderParams {

    companyId: number,
    parentId: number,
    name: string,
}

@Component({
    selector: 'add-folder',
    templateUrl: './add-folder.component.html',
    styleUrl: './add-folder.component.css',
    standalone: true,
    imports: [ButtonModule, DialogModule, FormsModule]
})

export class AddFolderComponent {

    constructor(private commentService: CommentService) { }

    userDetails = {
        name: '',
        email: '',
        address: '',
        mobile: '',
        age: null,
        gender: ''
    };

    visible: boolean = false;
    folderName: string = "";
    folderForm: FormGroup | undefined;
    parentFolderId?: number;
    errorMessage: String = "";

    showDialog() {
        this.visible = true;
    }

    createFolder(data: FolderParams, form: NgForm) {

        if (!data.name) {
            this.errorMessage = "Invalid Name";
            return;
        }
        data.companyId = 1;
        this.commentService.saveFolder(data).subscribe(response => {
            if (response.message == "Succeeded") {
                this.visible = false;
                form.resetForm();
            }
        }
        );
    }

    createFile() { }

    submitCreateFolder(data: JSON) {
        console.log(data);
    }
}