import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup , FormBuilder, Form, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;

  constructor(public authService : AuthenticateService, public router : Router, private formBuilder : FormBuilder) { 

    this.loginForm = this.formBuilder.group({
      email : ["",Validators.required],
      password : ["",Validators.required],
    })
    
  }

  connexion(form :FormGroup){
     if (this.loginForm.valid){
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get ('password')?.value;
      if (this.authService.existingUser(email,password)){
       this.router.navigateByUrl('trainings')
      }else{
        alert("champs invalides")
        
      }
     }
  }

 ngOnInit(): void {   }
  }


