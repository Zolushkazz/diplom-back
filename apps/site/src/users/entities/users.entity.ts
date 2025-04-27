import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({schema: 'site'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column({ length: 60 }) 
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: false })
  isVerified: boolean;
}