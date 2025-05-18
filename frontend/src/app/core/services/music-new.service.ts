import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MusicNew } from '../models/music-new.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicNewService {
  private apiUrl = 'http://44.214.111.49/api/noticias';

  constructor(private http: HttpClient) { }

  public postNew(noticia: MusicNew) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<MusicNew>(this.apiUrl, JSON.stringify(noticia));
  }

  public getNews(): Observable<MusicNew[]> {
    return this.http.get<MusicNew[]>(this.apiUrl);
  }

  public putNew(id: string | undefined, noticia: MusicNew): Observable<MusicNew> {
    return this.http.put<MusicNew>(`${this.apiUrl}/${id}`, noticia);
  }

  public patchNew(id: string | undefined, noticia: Partial<MusicNew>): Observable<MusicNew> {
    return this.http.patch<MusicNew>(`${this.apiUrl}/${id}`, noticia);
  }

  public deleteNew(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
