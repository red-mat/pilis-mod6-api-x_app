import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserModel } from "./types";

@Entity()
class UserEntity extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isDeleted!: boolean;
}

export default UserEntity;
