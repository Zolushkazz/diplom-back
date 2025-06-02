import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity({schema:'site'})
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ nullable: true })
  notes: string;


  @ManyToOne(() => User)
@JoinColumn({ name: 'receiverName' })
receiver: User;


   @Column({ nullable: true })
  receiverName?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}


