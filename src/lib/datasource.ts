import { DataSource } from "typeorm";
import Ad from "../entities/Ad.entity";

export default new DataSource({
  type: "sqlite",
  database: "thegoodcornerorm.sqlite",
  entities: [Ad],
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});
