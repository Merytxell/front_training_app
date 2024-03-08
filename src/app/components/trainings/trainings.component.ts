import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})

/**
 * Composant de gestion des formations permettant l'affichage et l'ajout dans le panier de formation
 */
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;  
  error : null = null;
  
  constructor(private cartService : CartService, private router : Router, private apiService : ApiService) {
   }

  ngOnInit(): void {        
    this.listTrainings = [ 
      {id:1,name:'Java',description:'Formation Java SE 8 sur 5 jours',price:1500,quantity:1 },
      {id:2,name:'DotNet',description:'Formation DotNet 3 jours',price:1000,quantity:1 },
      {id:3,name:'Python',description:'Formation Python/Django 5 jours',price:1500,quantity:1 } 
    ];
  }

  /**
   * Méthode permettant l'ajout d'une formation au panier en utilisant le service dédié
   * @param training 
   */
  onAddToCart(training:Training){
    if(training.quantity > 0) {
     this.cartService.addTraining(training);
     this.router.navigateByUrl('cart');
    }
  }

  //appelle méthode getTraining de l'objet apiService
  //effectue une opération asynchrone qui peut émettre plusieurs valeurs
  getAllTraining () {
    this.apiService.getTrainings().subscribe({
      //lorsque qu'une nouvelle valeur est émise par l'observable listTraining est appelée
      //Elle prend la valeur émise comme paramètre data et affecte cette valeur à this.listTrainings
      next :(data) => this.listTrainings=data,
      // Si une erreur se produit pendant l'exécution de l'Observable, this.error est appelé. 
      //Elle prend l'objet d'erreur err en paramètre et affecte son message à this.error.
      error: (err) => this.error = err.message,
      // Lorsque l'Observable se termine avec succès, thid.error est appelée
      // indique que l'opération asynchrone est terminée sans erreur. Elle réinitialise this.error à null.
      complete : () => this.error = null
    })
  }
}
