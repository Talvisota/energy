import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor() {}
  // just a simple alert as of now the service is overkill still in for Architectual reasons
  // TODO: Maybe a Modal Dialogue?
  log(msg: string) {
    alert(msg);
  }
}
