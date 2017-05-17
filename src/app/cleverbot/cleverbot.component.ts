import { Component, OnInit } from '@angular/core';
import { CleverbotService } from 'app/cleverbot.service';

@Component({
  selector: 'app-cleverbot',
  templateUrl: './cleverbot.component.html',
  styleUrls: ['./cleverbot.component.css'],
  providers: [CleverbotService]
})
export class CleverbotComponent implements OnInit {
  conversations = [];

  constructor(private cleverbotService: CleverbotService) { }

  ngOnInit() {
  }

  addConversation(input) {
    this.conversations = [];
    this.cleverbotService.getClever(input).subscribe(
      (data) => this.conversations.push(data)
    );
  }

}
