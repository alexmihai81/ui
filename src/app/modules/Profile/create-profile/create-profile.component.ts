import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { AppState } from 'src/app/app.reducer';
import { Breed } from '../../shared/models/breed.model';
import { ProfileRequest } from '../../shared/models/profile-request.model';
import { Species } from '../../shared/models/species.model';
import { authDetails } from '../../shared/selectors/auth.selector';
import { AnimalsService } from '../../shared/services/animals.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  species: Species[];
  breeds: Breed[];
  form: FormGroup;
  userId: number;
  url: string = undefined;

  constructor(private animalsService: AnimalsService, private fb: FormBuilder, private notifier: NotifierService, private store: Store<AppState>, private router: Router) {
    this.form = fb.group({
      breed: [null, [Validators.required]],
      species: [null, Validators.required],
      birthDay: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.store.select(authDetails).subscribe((details) => {
      this.userId = details.userId;
    })
    this.animalsService.getSpecies().subscribe((response) => {
      this.species = response;
    })
    this.animalsService.getBreeds().subscribe((resopnse) => {
      this.breeds = resopnse;
    })
  }

  onSubmit() {
    if (!this.form.invalid && this.url) {
      const request = new ProfileRequest();
      request.name = this.form.controls['name'].value;
      request.birthday = this.form.controls['birthDay'].value;
      request.gender = this.form.controls['gender'].value;
      request.breedId = +this.form.controls['breed'].value;
      request.speciesId = +this.form.controls['species'].value;
      request.userId = this.userId;
      request.url = this.url;
      this.animalsService.saveAnimal(request).subscribe((resopnse) => {
        this.notifier.notify('success', 'Profile created successfully!');
        this.router.navigate(['profile']);
      }, () => {
        this.notifier.notify('error', 'Registration failed!');
      });
    } else {
      this.form.markAllAsTouched();
      if (!this.url) {
        this.notifier.notify('error', 'Image is mandatory!');
      }
    }
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event2) => {
      this.url = '' + reader.result;
    }
  }
}
