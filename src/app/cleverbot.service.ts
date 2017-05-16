import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BotApi } from 'app/botApiKey';
import 'rxjs/Rx';

@Injectable()
export class CleverbotService {

  constructor(private http:Http, private ApiKey: BotApi) { }

  cleverapi: string = this.ApiKey.botapi;

  getClever(input){
    return this.http.get("https://www.cleverbot.com/getreply?input=" + input + "&key=" + this.cleverapi).map(
      (res) => res.json()
    );
  }
}
