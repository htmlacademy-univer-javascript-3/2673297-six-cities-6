type Place = {
  name: string;
  type: string;
  imageUrl: string;
  price: number;
  rating: number;
  isPremium: boolean;
  inBookmarks: boolean;
}

export const OfferCards: Place[] = [
  {
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    imageUrl: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    isPremium: true,
    inBookmarks: false
  },
  {
    name: 'Wood and stone place',
    type: 'Room',
    imageUrl: 'img/room.jpg',
    price: 80,
    rating: 4,
    isPremium: false,
    inBookmarks: true
  },
  {
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    imageUrl: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    isPremium: false,
    inBookmarks: false
  },
  {
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    imageUrl: 'img/apartment-03.jpg',
    price: 180,
    rating: 5,
    isPremium: true,
    inBookmarks: false
  }
];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
