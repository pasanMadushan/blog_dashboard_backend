import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id:nunmber;

    @Column()
    name:string

    @Column({ unique:true })
    username : string;

    @Column()
    role : string;
    
}