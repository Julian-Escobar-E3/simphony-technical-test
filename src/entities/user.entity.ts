import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Service } from "./service.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @ApiProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column('text', { array: true, default: ['user'] })
  rol: string[];

  @Exclude()
  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  // Relación muchos a muchos con Servicio
  @ManyToMany(() => Service, (service) => service.users, { cascade: true })
  @JoinTable({
    name: 'user_service',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'serviceId' },
  })
  services: Service[];
}
