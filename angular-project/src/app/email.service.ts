import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost/backend'; // ระบุ URL ที่เชื่อมต่อกับ Backend

  constructor(private http: HttpClient) {}

  sendTaskAssignmentEmail(
    taskData: any,
    recipients: string[],
    subject: string,
    content: string,
    files: File[]
  ): Observable<any> {
    const formData = new FormData();
    formData.append('taskData', JSON.stringify(taskData));
    formData.append('recipients', JSON.stringify(recipients));
    formData.append('subject', subject);
    formData.append('content', content);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('file[]', files[i], files[i].name);
      }
    }
    return this.http.post(`${this.apiUrl}/send-email.php`, formData);
  }
}
