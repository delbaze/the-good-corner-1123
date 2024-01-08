import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
class Tag {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  // @ManyToMany(() => Ad, (ad) => ad.tags, { cascade: true })
  // @JoinTable().
  // ads: Ad[];
}

@InputType()
export class TagCreateInput {
  @Field()
  name: string;
}
@InputType()
export class TagUpdateInput {
  @Field()
  name: string;
}

export default Tag;
