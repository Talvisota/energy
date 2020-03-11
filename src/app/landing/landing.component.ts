import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { MessageService } from '../order/message/message.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {


  constructor(private orderService: RestService, private messageService: MessageService) { }


  // resets order count, responds with alert if something went wrong
  resetApi() {
    this.orderService.ResetData().subscribe(e => {
      if(e !== 'success') {
        this.messageService.log('Fehler beim Reset');
      }
    })
  }
}
