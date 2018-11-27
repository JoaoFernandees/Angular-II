import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SingUpService } from './singup.service';
import { Router } from '@angular/router';


@Component({

    templateUrl: './singup.component.html'
})

export class SingUpComponent implements OnInit{
    
    singupForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder, private userNotTakenValidatorService: UserNotTakenValidatorService, private singUpService: SingUpService, private router: Router) {}
    
    ngOnInit(): void {
        this.singupForm = this.formBuilder.group({
            email:['', [Validators.required, Validators.email]],
            fullName:['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            userName:['', [Validators.required, lowerCaseValidator,Validators.minLength(2), Validators.maxLength(30)], this.userNotTakenValidatorService.checkUserNameTaken()],
            password:['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
        })
    }

    singup() {

        const newUser = this.singupForm.getRawValue() as NewUser;
        this.singUpService
        .singup(newUser)
        .subscribe(
            () => this.router.navigate(['']), 
            err => console.log(err)
        );
    }
}