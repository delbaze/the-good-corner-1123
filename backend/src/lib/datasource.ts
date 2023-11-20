import Ad from '../entities/Ad.entity';
import Category from '../entities/Category.entity';
import Tag from '../entities/Tag.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: "sqlite",
  database: "thegoodcorner.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});
