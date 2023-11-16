import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  
  @Column()
  createdAt: string;
  

}
export default Ad;
