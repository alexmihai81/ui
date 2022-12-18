import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { authDetails } from '../../shared/selectors/auth.selector';
import { AnimalsService } from '../../shared/services/animals.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  profileId: number;
  messages = [];
  form: FormGroup;

  constructor(private store: Store<AppState>, private animalsService: AnimalsService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.select(authDetails).subscribe(details => {
      this.profileId = details.profileId;
    });
    this.animalsService.getMessages(this.route.snapshot.queryParams['id']).subscribe((messages => {
      this.messages = messages;
    }));
  }

  submit() {
    if (this.form.valid) {
      this.animalsService.sendMessage(this.route.snapshot.queryParams['id'], this.profileId, this.form.controls['message'].value).subscribe(() => {
        this.messages.push({ from: this.profileId, text: this.form.controls['message'].value });
        this.form.controls['message'].patchValue("");
      })
    }
  }

}
