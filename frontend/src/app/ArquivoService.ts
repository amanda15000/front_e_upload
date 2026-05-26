import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  private http = inject(HttpClient);
  
  // URL da sua API NestJS
  private apiUrl = 'http://localhost:3000/arquivo'; 
  
  // URL para carregar as imagens do backend
  public readonly staticUrl = 'http://localhost:3000/uploads';

  listarArquivos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  enviarArquivo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  removerArquivo(filename: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/nome/${filename}`);
  }
}