import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats-item',
  templateUrl: './chats-item.component.html',
  styleUrls: ['./chats-item.component.css']
})
export class ChatsItemComponent implements OnInit {

  @Input() chatInfo: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  chat() {
    this.router.navigate(["chat"], { queryParams: { id: this.chatInfo.chatId } });
  }

}
