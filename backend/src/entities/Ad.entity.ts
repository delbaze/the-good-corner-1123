import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category.entity";
import Tag from "./Tag.entity";

@Entity()
class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @Column()
  picture: string;

  @Column()
  location: string;

  @Column({ default: Date.now() })
  createdAt: number;

  @ManyToOne(() => Category, (c) => c.ads, {
    nullable: false,
    onDelete: "CASCADE",
  }) //j'interdis de créer une annonce sans lui attribuer une catégorie, et je demande à supprimer l'annonce lorsque la catégorie est supprimée!
  category: Category;

  @ManyToMany(() => Tag, { cascade: ["insert", "update"] })
  @JoinTable()
  tags: Tag[];
}
export default Ad;
