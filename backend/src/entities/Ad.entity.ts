import {
  AfterInsert,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category.entity";
import Tag from "./Tag.entity";
import slugify from "slugify";

@Entity()
class Ad {
  @BeforeUpdate()
  @BeforeInsert()
  protected createSlug() {
    this.slug = `${slugify(this.title, { lower: true })}-${Math.floor(
      Math.random() * 1000000
    )}`;
  }

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

  @Column({ unique: true })
  slug: string;

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
