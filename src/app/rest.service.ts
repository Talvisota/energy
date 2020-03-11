import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  Observable,
  of
} from 'rxjs';
import {
  catchError,

} from 'rxjs/operators';

export interface OrderForm {
  geschmacksrichtung: string;
  vorname: string;
  nachname: string;
  email: string;
  strasse: string;
  plz: string;
  ort: string;
  tel: string;
}


@Injectable({
  providedIn: 'root'
})
export class RestService {
  userKey = 201811948830;
  dataUrl = 'http://energydrink.stage.mediadivision.ch/api/';

  params = new HttpParams();



  constructor(private http: HttpClient) {}
  prePareOrder(form: OrderForm): string {
    // builds attribute string from form object
    let result = '';
    for (const [key, value] of Object.entries(form)) {
      result = result.concat(`&${key}=${value}`);
    }
    return result;
  }
  postForm(form: OrderForm): Observable <string> {
    // post form data to url
    return this.http.post(`${this.dataUrl}post.php?key=${this.userKey}&${this.prePareOrder(form)}`,
     '', {responseType: 'text' as 'text'}).pipe(
      catchError(this.handleError < any > ('postForm'))
    );
  }
  getSampleAmount(): Observable<number> {
    // get amount of ordered samples
    return this.http.post(`${this.dataUrl}count.php?key=${this.userKey}}`,
     '', {responseType: 'text' as 'text'}).pipe(
      catchError(this.handleError < any > ('postForm'))
    );
  }
  ResetData(): Observable<string> {
    // reset the amount of ordered samples
    return this.http.post(`${this.dataUrl}reset.php?key=${this.userKey}}`,
     '', {responseType: 'text' as 'text'}).pipe(
      catchError(this.handleError < any > ('postForm'))
    );
  }
  handleError < T > (operation = 'operation', result ? : T) {
    return (error: any): Observable < T > => {
      // log errors to console
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
