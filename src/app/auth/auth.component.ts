import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;


  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private dataStorageService: DataStorageService) {
    this.dataStorageService.fetchRecipes().subscribe();
    this.dataStorageService.fetchShoppingList().subscribe();
    this.dataStorageService.fetchCategories().subscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
        responseData => {
          this.isLoading = false;
          if (responseData.localId === this.dataStorageService.getUser()) {
              this.dataStorageService.fetchRecipes().subscribe();
              this.dataStorageService.fetchShoppingList().subscribe();
              this.dataStorageService.fetchCategories().subscribe();
              this.router.navigate(['/recipes']);
          }
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
       }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
