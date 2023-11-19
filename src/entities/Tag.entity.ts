import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // @ManyToMany(() => Ad, (ad) => ad.tags, { cascade: true })
  // @JoinTable().
  // ads: Ad[];
}
export default Tag;
