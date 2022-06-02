import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

export enum UserRole{
    ADMIN = 'admin',
    EDITOR = 'editor'
}

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string

    @Column({ unique:true })
    username : string;

    @Column({ type:'enum', enum:UserRole , default: UserRole.EDITOR })
    role : UserRole;

    @Column({ unique:true })
    email : string;

    @Column()
    password : string;

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }

    @Column({default: false})
    active: boolean;  
}