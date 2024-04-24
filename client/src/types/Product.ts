export interface Product {
  _id: string;
  productName: string;
  productGender: string;
  productThumbnail: string;
  productBrand: string;
  displayPrice: number;
}
export interface BestsellerProduct {
  _id: string;
  productName: string;
  productThumbnail: string;
  productBrand: string;
  displayPrice: number;
  productGender?: string;
}
export interface SimilarProduct {
  _id: string;
  productName: string;
  productThumbnail: string;
  productBrand: string;
  productGender: string;
  displayPrice: number;
}

export interface ProductDetail {
  _id: string;
  productName: string;
  productBrand: string;
  productGender: string;
  priceScale: {
    capacity: string;
    price: number;
    _id: string;
  }[];
  productFeatures: {
    release: string;
    suitableAge: string;
    savingTime: string;
  };
  productScent: {
    mainScent: string[];
    firstNotes: string[];
    middleNotes: string[];
    finalNotes: string[];
  };
  seasonRate: {
    Spring: number;
    Summer: number;
    Autumn: number;
    Winter: number;
  };
  dayNightRate: {
    day: number;
    night: number;
  };
  productThumbnail: string;
  productDescription: string;
  similarProducts: SimilarProduct[];
}
