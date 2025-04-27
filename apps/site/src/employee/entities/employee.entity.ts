import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum GenderEnum {
  Male = 'male',
  Female = 'female',
}

@Entity({schema: 'site'})
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  password: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  department: string;

  @Column()
  role: string;

  @Column({ unique: true, nullable: true})
  email: string;

  @Column({nullable: true})
  phone: string;

  @Column({nullable: true})
  workPhone: string;
  
  @Column({nullable: true})
  familyName: string;

  @Column({nullable: true})
  birthDate: string;

  @Column({nullable: true})
  major: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender: GenderEnum;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  province: string;

  @Column({nullable: true})
  district: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password && this.password !== '') {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}