import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'site' })
export class Activities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityName: string;

  @Column()
  activityType: string;

  @Column()
  department: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date; 

  @Column({ type: 'time', nullable: true })
  startTime?: string;

  @Column({ nullable: true })
  district?: string; 

  @Column("simple-array", { nullable: true })
  participant?: string[]; 

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'text', nullable: true })
  decision?: string; 

  @Column("simple-array", { nullable: true })
  file?: string[];
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
