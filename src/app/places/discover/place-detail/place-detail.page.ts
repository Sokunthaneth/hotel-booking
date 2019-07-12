import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  private place: Place;
  private placeId: string;

  constructor(
    private route: ActivatedRoute, 
    private navCtrl: NavController, 
    private placesService: PlacesService, 
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placeId = paramMap.get('placeId');
      console.log(this.placeId);
      this.place = this.placesService.getPlace(this.placeId);
    });
  }

  onBookPlace() {
    this.modalCtrl.create({
      component: CreateBookingComponent, 
      componentProps: {selectedPlace: this.place}})
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if(resultData.role === 'confirm'){
        console.log('BOOKED!')
      }
    });
  }

}
