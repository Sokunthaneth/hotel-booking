import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  private loadedBookings: Booking[];
  private isLoading: boolean = false;
  private bookingSub: Subscription;

  constructor(
    private bookingsService: BookingService, 
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingsService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if(this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    this.loadingCtrl.create({
      message: 'Cancelling....'
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingsService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    })
  }
}
