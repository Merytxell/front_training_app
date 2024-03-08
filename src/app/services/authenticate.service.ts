import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { cryptoService } from '../service/AES/crypto-service.';



@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  connectedUser : User | null;    
private users = [
{email:'claire@gmail.com' ,password:'1234', roles:['ADMIN','USER']},
{email:'toto@gmail.com' ,password:'1234', roles:['USER']},
];
  constructor( private cryptoService : cryptoService) { this.connectedUser = this.getUser() }
  

  //trouver si l'user existe en comparant ce qu'il saisit aux infos dans users
  existingUser(email : string, password : string) : boolean{
    const user = this.users.find(u => u.email === email && u.password === password);
    if(user){
      this.encryptedUser(user);
      this.saveUser(user);
      return true;
    }
    return false;
  }

 /**
  * Methode pour crypter les données users
  * @param email 
  * @param password 
  * @returns 
  */
  encryptedUser (user : User) {
      user.password = this.cryptoService.encrypt(user.password);
      user.email= this.cryptoService.encrypt(user.email);
      console.log(user.password);
     
    }

/**
 * Methode pour décrypter les données users
 */
  decryptedUser (user : User)  {
  user.password = this.cryptoService.decrypt(user.password);
  user.email = this.cryptoService.decrypt(user.email);
  
  }

  /**
   * fonction qui permet d'enregistrer l'user dans le LS
   * @param user 
   */
  saveUser(user: User) {
    localStorage.setItem('user',JSON.stringify(user));
  }
/** 
* fonction qui permet de récupérer un user depuis le LS
 */
  getUser() : User | null {
    let user = localStorage.getItem('user');
    if (user){
      return JSON.parse(user);
    }else{
      return null;
    }
  }

 /**fonction qui permettra de vérifier si user est admin ou pas */
  isAdmin() : boolean  {
    this.connectedUser= this.getUser();
    if (this.connectedUser){
      if(this.connectedUser.roles.includes('ADMIN')){
      console.log("oui c'est un admin");
      return true;
      } else {
        console.log("c'est pas un admin")
        return false;
      } 
    }
    return false;
  }
}


