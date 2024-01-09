import {
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
import { Field, Float, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
class Ad {
  @BeforeUpdate()
  @BeforeInsert()
  protected createSlug() {
    this.slug = `${slugify(this.title, { lower: true })}-${Math.floor(
      Math.random() * 1000000
    )}`;
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column()
  owner: string;

  @Field(() => Float)
  @Column()
  price: number;

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field(() => String)
  @Column({ default: Date.now() })
  createdAt: number;

  @Field(() => Category)
  @ManyToOne(() => Category, (c) => c.ads, {
    nullable: false,
    onDelete: "CASCADE",
  }) //j'interdis de créer une annonce sans lui attribuer une catégorie, et je demande à supprimer l'annonce lorsque la catégorie est supprimée!
  category: Category;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, { cascade: ["insert", "update"] })
  @JoinTable()
  tags: Tag[];
}

@InputType()
export class PartialCategoryInput {
  @Field()
  id: number;
}

@InputType()
export class AdCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  owner: string;

  @Field(() => Float)
  price: number;

  @Field()
  location: string;

  @Field()
  picture: string;

  @Field()
  category: PartialCategoryInput;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
@InputType()
export class AdUpdateInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  owner: string;

  @Field(() => Float, { nullable: true })
  price: number;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  category: PartialCategoryInput;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
export default Ad;
