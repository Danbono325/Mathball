import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  readonly playerSearchURL = "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" 

  constructor(private http: HttpClient) { }

  searchPlayers(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(this.playerSearchURL + searchTerm + "%25'");
  }
}
