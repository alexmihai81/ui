import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { AppState } from 'src/app/app.reducer';
import { ProfileIdUpdate } from '../../shared/actions/auth.actions';
import { Breed } from '../../shared/models/breed.model';
import { ProfileRequest } from '../../shared/models/profile-request.model';
import { Profile } from '../../shared/models/profile.model';
import { Species } from '../../shared/models/species.model';
import { authDetails } from '../../shared/selectors/auth.selector';
import { AnimalsService } from '../../shared/services/animals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  species: Species[];
  breeds: Breed[];
  updateForm: FormGroup;
  userId: number;
  allProfiles: Profile[];
  selectedProfile: Profile;
  selectForm: FormGroup;
  firstSet = true;

  constructor(private fb: FormBuilder, private animalsService: AnimalsService, private store: Store<AppState>, private notifier: NotifierService) {
    this.updateForm = fb.group({
      name: ['', Validators.required],
      birthDay: ['', Validators.required],
      breed: [null, Validators.required],
      species: [null, Validators.required]
    });
    this.selectForm = fb.group({
      selectedProfile: null
    });
  }

  updateUpdateForm() {
    this.updateForm.controls["name"].setValue(this.selectedProfile.name);
    this.updateForm.controls["birthDay"].setValue(this.selectedProfile.birthday);
    this.updateForm.controls["breed"].setValue(this.selectedProfile.breedId);
    this.updateForm.controls["species"].setValue(this.selectedProfile.speciesId);
  }

  updateSelectForm() {
    this.selectForm.controls["selectedProfile"].setValue(this.selectedProfile.id);
  }

  ngOnInit(): void {
    this.animalsService.getSpecies().subscribe((response) => {
      this.species = response;
    })
    this.animalsService.getBreeds().subscribe((response) => {
      this.breeds = response;
    })
    this.store.select(authDetails).subscribe(details => {
      if (this.firstSet) {
        this.userId = details.userId;
        this.animalsService.getAllAnimalsForUser(this.userId).subscribe((response) => {
          this.allProfiles = response;
          this.selectedProfile = this.allProfiles?.find(p => p.selected === true);
          this.updateUpdateForm();
          this.updateSelectForm();
          this.firstSet = false;
        });
      }
    });
    this.selectForm.controls["selectedProfile"].valueChanges.subscribe((value) => {
      if (!this.firstSet) {
        this.animalsService.selectAnimal(this.userId, value).subscribe((response) => {
          this.selectedProfile = response;
          this.allProfiles.forEach(p => p.selected = false);
          const index = this.allProfiles.findIndex(p => p.id === response.id);
          this.allProfiles[index] = response;
          this.updateUpdateForm();
          this.store.dispatch(new ProfileIdUpdate({ profileId: +value }));
        })
      }
    })
  }

  onSubmit() {
    if (!this.updateForm.invalid) {
      const request = new ProfileRequest();
      request.id = this.selectedProfile.id;
      request.name = this.updateForm.controls['name'].value;
      request.birthday = this.updateForm.controls['birthDay'].value;
      request.gender = this.selectedProfile.gender;
      request.breedId = +this.updateForm.controls['breed'].value;
      request.speciesId = +this.updateForm.controls['species'].value;
      request.userId = this.userId;
      request.url = this.selectedProfile.url;
      request.selected = this.selectedProfile.selected;
      this.animalsService.updateAnimal(request).subscribe((response: any) => {
        this.selectedProfile = response;
        const index = this.allProfiles.findIndex(p => p.id === response.id);
        this.allProfiles[index] = response;
      }, () => {
        this.notifier.notify('error', 'Update failed!');
      })
    }
  }

  deleteProfile() {
    this.animalsService.deleteProfile(this.selectedProfile.id, this.userId).subscribe((response) => {
      const index = this.allProfiles.findIndex(p => p.id === this.selectedProfile.id);
      this.allProfiles.splice(index, 1);
      this.selectedProfile = response;
      this.updateUpdateForm();
      this.updateSelectForm();
      this.notifier.notify('success', "Profile deleted successfully!");
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event2) => {
      this.selectedProfile.url = '' + reader.result;
    }
  }
}
