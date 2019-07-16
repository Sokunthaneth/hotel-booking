import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://i.pinimg.com/originals/c2/a2/13/c2a213a1d6044631e5ff8de2d3e338bd.jpg',
        10000.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
    ),
    new Place(
      'p2',
      'Paris Town House',
      'In the city of romance, Paris.',
      'https://static1.squarespace.com/static/5236f137e4b0588d65814e39/t/5a80cca20852294ef6072754/1518390442537/TOWN+MANSION+FOR+SALE+IN+PARIS+4TH%2C+MARAIS?format=1500w',
      15000.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
    ),
    new Place(
      'p3',
      'San Francisco Victorian Houses',
      'In the suburb of San Francisco',
      'https://s3.amazonaws.com/zumpermedia/blog/2015/08/san-francisco-skyline-victorian-houses.jpg',
      75000.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
    ),
    new Place(
      'p4',
      'Tokyo Town House',
      'In the suburb of Tokyo',
      'https://i.pinimg.com/originals/7a/1d/f0/7a1df0245b627a5287f9b35773c05ea0.jpg',
      12500.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
    ),
    new Place(
      'p5',
      'Berlin Town House',
      'In the heart of Berlin City.',
      'https://www.exklusiv-immobilien-berlin.de/wp-content/uploads/2016/05/ST-Townhouses_RuBu-624x450.jpg',
      17500.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
    ),
  ];

  get places() {
    return [...this._places];
  }
  
  constructor() { }

  getPlace(id: string){
    return {...this._places.find(p => p.id === id)};
  }
}
