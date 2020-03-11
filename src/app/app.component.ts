import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from './rest.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  enableForm = false;
  samples = 0;
  maxSample: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private restService: RestService) {}
  title = 'energyDrink';
  ngOnInit() {
    // max amount of available samples. Maybe receive the sometime per api
    this.maxSample = 1000;
    // wait for result of api call
    this.restService.getSampleAmount().pipe(takeUntil(this.destroy$)).subscribe(amount => {
      this.enableForm = this.maxSample - amount > 0;
      this.samples = this.maxSample - amount;
    });
  }
  ngOnDestroy() {
    // best practice to destroy subscriptions, prevents memory leaks
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
