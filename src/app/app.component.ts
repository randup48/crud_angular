import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users';
import { UserService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  onAdd() {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.userService.getUsers().subscribe((heroes) => (this.users = heroes));
  }
}
