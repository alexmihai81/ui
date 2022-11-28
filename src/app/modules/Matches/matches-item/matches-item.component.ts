import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../shared/models/profile.model';
import { AnimalsService } from '../../shared/services/animals.service';

@Component({
  selector: 'app-matches-item',
  templateUrl: './matches-item.component.html',
  styleUrls: ['./matches-item.component.css']
})
export class MatchesItemComponent {

  @Input() profile: Profile;
  @Input() id: number;
  @Output() deletedMatch = new EventEmitter<void>();

  constructor(private router: Router, private animalsService: AnimalsService) { }

  deleteMatch() {
    this.animalsService.deleteMatch(this.id, this.profile.id).subscribe(() => {
      this.deletedMatch.emit();
    });
  }

  chat() {
    this.router.navigate(['chat', this.profile.id]);
  }

}
