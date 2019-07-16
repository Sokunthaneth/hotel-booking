import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading: boolean = false;
  isLogin: boolean = true;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {

  }

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl.create({keyboardClose: true, message: 'Logging In...'})
      .then(loadingEle => {
        loadingEle.present();
        setTimeout(() => {
          this.isLoading =  false;
          loadingEle.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 1500);
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password =  form.value.password;
    console.log(email, password);

    if(this.isLogin) {
      // Send request to login server
    } else {
      // Send request to signup server
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
