// activities.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'site' })
export class Activities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  authorId: string;

  @Column()
  activityName: string;

  @Column()
  activityType: string;

  @Column()
  department: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  lng: string;

  @Column('jsonb', { nullable: true })
  participant: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    image: string;
  }[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  decision: string;

  @Column('simple-array', { nullable: true })
  file: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
