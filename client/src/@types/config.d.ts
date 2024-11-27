export default interface Config {
  env: string;
  database: string;
  frontEndUrl: string;
  imageFolder: string;

  smtp: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
  smtpFrom: string;
  roles: {
    admin: string,
    investor:string
  }
}
