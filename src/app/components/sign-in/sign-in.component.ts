import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateEmail } from '../validators/email-validator';
import { validatePassword } from '../validators/password-validator';
import { Employee } from 'src/app/model/Employee';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  
  email: FormControl
  password: FormControl

  signInForm: FormGroup

  successFlag: boolean
  errorFlag: boolean

  constructor( public router: Router, public authService:AuthService) {
    this.email = new FormControl('', [Validators.required, validateEmail()])
    this.password = new FormControl('', [Validators.required, Validators.minLength(8), validatePassword()])
    this.successFlag = false
    this.errorFlag = false

    this.signInForm = new FormGroup({
      email: this.email,
      password: this.password
    })

  }

  handleSignIn() {
    this.successFlag = false
    this.errorFlag = false
    console.log(this.signInForm);
    let user = new Employee(0, '', this.signInForm.controls['email'].value, this.signInForm.controls['password'].value)
    this.authService.signIn(user);
    // this.auth.signIn(user).subscribe(data => {

    //   // sign in failed
    //   if (!data) {
    //     this.errorFlag = true
    //     this.auth.userSubject.next(user)
    //   }

    //   // sign in succeeded
    //   else if (data) {
    //     this.successFlag = true
    //     this.auth.isLoggedIn = true
    //     this.auth.userSubject.next(data)
    //   }
    //   this.auth.user = data
    //   this.signInForm.markAsPristine()
    // })

  }

  isPasswordValid(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value
      if (password.length === 0)
        return null
      let lowerCount = 0
      let upperCount = 0
      let numberCount = 0
      let specialCharCount = 0
      for (let i = 0; i < password.length; i++) {
        const char = password.charAt(i)
        if (char >= 'A' && char <= 'Z')
          upperCount++
        if (char >= 'a' && char <= 'z')
          lowerCount++
        if (char >= '0' && char <= '9')
          numberCount++
        if (char === '!' || char === '@' || char === '#' || char === '%')
          specialCharCount++
      }
      return (lowerCount == 0 || upperCount == 0 || numberCount == 0 || specialCharCount == 0) ?
        {
          incorrectPasswordFormat: {
            msg:
              'Password must contain at least 1 lowercase, uppercase, number and a special character (! @ # %).'
          }
        } : null
    };
  }

  ngOnInit() {
    console.log('User from Sign In')
    // this.auth.user$.subscribe(res => console.log(res))
  }
}
