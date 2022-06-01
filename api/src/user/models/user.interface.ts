import { UserRole } from "./user.entity";

export interface User{
    id? : number ;
    name? : string;
    username? : string;
    role? : UserRole;
    email?: string;
    password? : string;
}