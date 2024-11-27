export interface ICreateMovie {
  title: string;
  publishedYear: string;
  image: File;
  author: string;
  director: string;
  genre: string;
}
export interface IUpdateMovie {
  title: string;
  publishedYear: string;
  image: File|string;
  author: string;
  director: string;
  genre: string;
}

export interface IVerifyOtp {
  email: string;

  otp: string;
}
