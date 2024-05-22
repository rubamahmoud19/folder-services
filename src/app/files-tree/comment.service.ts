import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';

@Injectable(
    {providedIn: 'root',}
)
export class CommentService {
    private baseUrl = 'https://localhost:44361/api/';

    constructor(private http: HttpClient) { }

    // getFolders(): Observable<any> {
    //     return this.http.get<any>(`${this.baseUrl}Folder/GetFoldersByCompanyId?companyId=1`);
    // }
    getFiles() {
        return this.http.get<any>(`${this.baseUrl}Folder/GetFoldersByCompanyId?companyId=1`)
        .toPromise().then(res => <any[]>res.data);
        }

    getLazyFiles() {
        return this.http.get<any>(`${this.baseUrl}Folder/GetFoldersByCompanyId?companyId=1`)
            .toPromise()
            .then(res => <any>res.data);
        }
    
    getDocument(id: number){
        return this.http.get(`${this.baseUrl}Document/Download/${id}`, {observe: 'response', responseType: 'blob'} )
            .toPromise()
            .then(res => <any> res);    
    }

    // getDocument(id: number){
    //     return this.http.get(`${this.baseUrl}Document/Download/${id}`, {observe: 'response', responseType: 'blob'} )         
    // }
    
    saveFolder(body: any){
        const headers = { 'Content-Type': 'application/json'};
        return this.http.post<any>(`${this.baseUrl}Folder/CreateFolder`, body, {headers});
    }



    
    // getFiles() {
    //     return Promise.resolve(this.getTreeNodesData());
    // }
    
}
