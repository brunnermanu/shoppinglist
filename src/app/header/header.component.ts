import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true ;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
    this.dataStorageService.storeShoppingList();
    this.dataStorageService.storeCategories();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    this.dataStorageService.fetchShoppingList();
    this.dataStorageService.fetchCategories().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
