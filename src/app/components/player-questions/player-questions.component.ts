import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-questions',
  templateUrl: './player-questions.component.html',
  styleUrls: ['./player-questions.component.scss']
})
export class PlayerQuestionsComponent implements OnInit {

  curPlayerID;

  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.curPlayerID = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getPhoto() {
    let photoURL =
      "https://securea.mlb.com/mlb/images/players/head_shot/" + this.curPlayerID + "@2x.jpg";

    return this.sanitizer.bypassSecurityTrustUrl(photoURL);
  }


}
