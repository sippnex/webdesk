import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value)
      .then((success: boolean) => {
        this.loading = false;
        if (success) {
          this.router.navigate(['dashboard']);
        } else {
          this.loginForm.get('password')!.reset();
          alert('Anmeldung fehlgeschlagen!');
        }
      });
  }

}
