import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MessageService } from '../order/message/message.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  constructor(private orderService: RestService, private messageService: MessageService) { }

  ngOnInit() {

  }
  resetApi() {
    this.orderService.ResetData().subscribe(e => {
      if(e !== 'success') {
        this.messageService.log(e);
        this.messageService.log('Fehler beim Reset');
      }
    })
  }
}
