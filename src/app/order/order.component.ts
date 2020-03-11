import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { RestService } from '../rest.service';
import { MessageService } from './message/message.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewInit, OnDestroy {
  orderSuccess = false;
  valid = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup;
  answer: string;
  constructor(fb: FormBuilder, private orderService: RestService, private messageService: MessageService) {
    this.form = fb.group({
      nachname: ['', [Validators.required]],
      vorname: ['', [Validators.required]],
      geschmacksrichtung: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      strasse: ['', [Validators.required]],
      plz: ['', [Validators.required]],
      ort: ['', [Validators.required]],
      tel: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // waits for changes in the form. debounces for a sek, to check for validation of the form and enables the order button if form is valid
    this.form.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(1000)).subscribe(formdata => {
      this.valid = this.form.valid;
    });
  }
  ngOnDestroy() {
    // best practice to unsubscribe all subscriptions in component
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  orderSample(form: any) {
    // starts the order process removes the form if successful, throws alert if something went wrong
    this.orderService.postForm(form).subscribe(e => {
      if (e === 'success') {
        this.orderSuccess = true;
      } else {
        this.messageService.log(e);
      }
    });
  }

}
