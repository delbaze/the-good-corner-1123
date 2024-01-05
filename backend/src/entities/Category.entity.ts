import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Ad from "./Ad.entity";
import { Field, ID, ObjectType } from "type-graphql";



@ObjectType()
@Entity()
class Category {
  
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Ad])
  @OneToMany(() => Ad, (a) => a.category)
  ads: Ad[];
}


export default Category;
