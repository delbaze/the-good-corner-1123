import Ad from '../entities/Ad.entity';
import Category from '../entities/Category.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: "sqlite",
  database: "thegoodcornerorm.sqlite",
  entities: [Ad, Category],
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});
