export type Offer = {
  name: string;
  type: string;
  imageUrl: string;
  price: number;
  rating: number;
  isPremium: boolean;
  id: number;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
};

export type Offers = Offer[];
