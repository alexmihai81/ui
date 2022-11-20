import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Breed } from '../../shared/models/breed.model';
import { ProfileRequest } from '../../shared/models/profile-request.model';
import { Species } from '../../shared/models/species.model';
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

  constructor(private animalsService: AnimalsService, private fb: FormBuilder) {
    this.form = fb.group({
      breed: [null, [Validators.required]],
      species: [null, Validators.required],
      birthDay: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.animalsService.getSpecies().subscribe((response) => {
      this.species = response;
    })
    this.animalsService.getBreeds().subscribe((resopnse) => {
      this.breeds = resopnse;
    })
  }

  onSubmit() {
    if (!this.form.invalid) {
      const request = new ProfileRequest();
      request.name = this.form.controls['name'].value;
      request.birthDay = this.form.controls['birthDay'].value;
      request.gender = this.form.controls['gender'].value;
      request.breed = this.form.controls['breed'].value;
      request.species = this.form.controls['species'].value;
      console.log(request);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
