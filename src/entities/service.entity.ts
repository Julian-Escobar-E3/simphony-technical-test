import { Exclude } from "class-transformer";
import { User } from "./user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('services')
export class Service {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @ApiProperty()
    @Column({ type: 'text' })
    description: string;

    @ApiProperty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    cost: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    category: string;

    @ApiProperty()
    @Exclude()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ApiProperty()
    @Exclude()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ApiProperty()
    @Exclude()
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

    // Relación muchos a muchos con Usuario
    @ManyToMany(() => User, (user) => user.services)
    users: User[];
}
