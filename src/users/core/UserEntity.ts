import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";
import { UserModel } from "./types";

@Entity({ name: "user" })
class UserEntity extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar: string | null;

}

export default UserEntity;
