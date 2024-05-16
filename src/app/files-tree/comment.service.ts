import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private baseUrl = 'https://localhost:44361/api/';

    constructor(private http: HttpClient) { }

    getFolders(): Observable<any> {
        return this.http.get<any>(`https://localhost:44361/api/Folder/GetFoldersByCompanyId?companyId=1`);
    }
}