import { Customer } from '../model/customer.model';

export class User {
    email : string;
    password : string;
    roles : string[];
    customer?: Customer;
 
    

    constructor(email:string, password : string, roles: string [] , customer?: Customer){
        this.email = email;
        this.password=password;
        this.roles=roles;
        this.customer=customer;
    } 
}