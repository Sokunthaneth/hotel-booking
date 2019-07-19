import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  private offers: Place[];
  private isLoading: boolean = false;
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private route:Router) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if(this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.route.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }
}
