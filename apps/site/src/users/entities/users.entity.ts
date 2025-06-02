// user.entitiy.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  PARTICIPANT = 'PARTICIPANT',
}

@Entity({ schema: 'site' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column({ length: 60 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PARTICIPANT })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: false })
  isVerified: boolean;
}
