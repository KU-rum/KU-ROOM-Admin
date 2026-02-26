export interface AddBannerRequest {
  link: string;
  image: File;
}

export interface Banner {
  bannerId: number;
  bannerImageUrl: string;
  bannerLink: string;
}
