import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false, unique: true })
  googleId: string;

  @Index()
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  emailVerified: boolean;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  givenName: string;

  @Column({ nullable: true })
  familyName: string;

  @Column({ type: "text", nullable: true })
  picture: string;

  @Column({ type: "boolean", default: true })
  isLoggedIn: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
