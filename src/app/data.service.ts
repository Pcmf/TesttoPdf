import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private ADDRESS = 'http://localhost/ConvToPdf/';

  constructor(private http: HttpClient) { }

  /**  */
  getData( params) {
    return this.http.get(this.ADDRESS + params);
  }

  saveData(path: string, obj: any) {
    return this.http.post(this.ADDRESS + path, JSON.stringify(obj));
    // incluir uma forma de notificar que os dados foram inseridos ou erro
  }


}


