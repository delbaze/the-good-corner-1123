import Ad from "../entities/Ad.entity";
import Category from "../entities/Category.entity";
import Tag from "../entities/Tag.entity";
import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [Ad, Category, Tag],
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});
// export default new DataSource({
//   type: "sqlite",
//   database: "thegoodcorner.sqlite",
//   entities: [Ad, Category, Tag],
//   synchronize: true, //à ne pas utiliser en production
//   logging: ["error", "query"], //à ne pas utiliser en production
// });

// process.env.POSTGRES_USER
// process.env.POSTGRES_PASSWORD
