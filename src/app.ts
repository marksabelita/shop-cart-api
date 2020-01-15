import * as Express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import routes from "./routes";

class App {

  public app: Express.Application;

  constructor() {
    this.app = Express();
    this.config();
  }

  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(routes)
  }
}

export default new App().app;

