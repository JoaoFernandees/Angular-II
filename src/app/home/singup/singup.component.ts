import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SingUpService } from './singup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';


@Component({

    templateUrl: './singup.component.html'
})

export class SingUpComponent implements OnInit{
    
    singupForm: FormGroup;
    @ViewChild('emailInput')emailInput: ElementRef<HTMLInputElement>;
    
    constructor(private formBuilder: FormBuilder, private userNotTakenValidatorService: UserNotTakenValidatorService, private singUpService: SingUpService, private router: Router, private platformDetectorService: PlatformDetectorService) {}
    
    ngOnInit(): void {
        this.singupForm = this.formBuilder.group({
            email:['', [Validators.required, Validators.email]],
            fullName:['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            userName:['', [Validators.required, lowerCaseValidator,Validators.minLength(2), Validators.maxLength(30)], this.userNotTakenValidatorService.checkUserNameTaken()],
            password:['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
        });

        this.platformDetectorService.isPlatformBrowser() &&
        this.emailInput.nativeElement.focus();
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