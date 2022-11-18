import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {

  @ViewChild('myCard') myCard: any;
  @ViewChild('myAllCards') myAllCards: any;

  AllCards: Array<any> = [
    {
      src: "https://placeimg.com/600/300/people",
      name: "Name4",
      info: "Info4",
    },
    {
      src: "https://placeimg.com/600/300/tech",
      name: "Name3",
      info: "Info3",
    },
    {
      src: "https://placeimg.com/600/300/nature",
      name: "Name2",
      info: "Info2",
    }, {
      src: "https://placeimg.com/600/300/animals",
      name: "Name1",
      info: "Info1",
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  swipeCard(button: boolean): void {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    this.myCard = cards[0];
    this.myCard.classList.add('removed');

    if (button) {
      this.myCard.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      this.myCard.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    var allCards = document.querySelectorAll('.tinder--card');
    var newCards = this.myAllCards.querySelectorAll('.tinder--card:not(.removed)');
    newCards.forEach(function (card, index) {
      card.style.zIndex = allCards.length - index;
      card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      card.style.opacity = (10 - index) / 10;
    });


  }


}
