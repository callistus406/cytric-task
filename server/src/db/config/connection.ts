import { Sequelize } from "sequelize";
import { defineModels } from "../models";

interface IConnection {
  databaseName: string;
  databaseUsername: string;
  databasePassword: string;
  databaseHost: string | undefined;

  options: {
    host: string | undefined;
    dialect: any;
    logging: boolean;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };
}

let sequelize: Sequelize;

class CreateConnection {
  private sequelize: Sequelize;

  constructor(
    private databaseName: string,
    private databaseUsername: string,
    private databasePassword: string,
    private databaseHost: string,
    private options: any
  ) {
    this.sequelize = new Sequelize(
      databaseName,
      databaseUsername,
      databasePassword,
      options
    );
  }

  establishConnection() {
    const sequelize = new Sequelize(
      this.databaseName,
      this.databaseUsername,
      this.databasePassword,
      this.options
    );

    return sequelize;
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
  
      defineModels(this.sequelize);
  
      await this.sequelize.sync(); 
  
      console.log("PostgreSQL tables created successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}  

export { CreateConnection, sequelize };
