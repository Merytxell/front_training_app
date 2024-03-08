import { Component, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

/**
 * Composant de gestion du récapitulatif d'une commande + validation
 */
export class OrderComponent implements OnInit {
  dateOrder : Date = new Date();
  customer : Customer | undefined;
  isConnected : boolean = false;
  
  constructor(public cartService : CartService, private authService : AuthenticateService, private router : Router) { }

  ngOnchanges(changes : SimpleChange): void {
  console.log('ngOnChanges' + changes)
  }

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer();
    const user= this.authService.getUser();
    if (user) {
      if (user.customer) {
        this.customer = user.customer;
        this.isConnected=true;
      } else {
        console.log("Aucune information de client trouvée pour l'utilisateur connecté.");
      }
    } else {
      console.log("Aucun utilisateur connecté.");
    }
  }
   

  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  ngOnDestroy():void{
    console.log('ngOnDestroy')
  }

  /**
   * Méthode appelé en cas de validation d'une commande
   * si user confirme alors l'appli est remise dans son état initial
   */
  onOrder(){
    if(confirm("Aujourd'hui c'est gratuit, merci de votre visite :)")){
        this.cartService.clearLocalStorage();
        this.router.navigateByUrl('/trainings');
    }else {
      alert("Vous devez vous connecter pour passer une commande.");
    }
  }
}
