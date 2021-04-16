import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {
    console.log('services coriendo......');
   }
   getQuery(query:string){
    const headers = new HttpHeaders({
      'Authorization':'Bearer BQCeTDY2BkXdU-lhZpVNiv-BMGSHOEl_jCflV1d8gIcBDy0Taa4xZrkKra7Y9zHR2wq9MpnHGOFkfo85kU4'
     });
     const url=`https://api.spotify.com/v1/${query}`;
     return this.http.get(url,{headers});
   }

   getNewReleases(){

     return this.getQuery('browse/new-releases?limit=10')
     .pipe(map(data=>{
      return data['albums'].items;
    }));
   }

   getArtista(termino:string){
  const url =`search?q=${termino}&type=artist&limit=10`;
    return this.getQuery(url)
    .pipe(map(data=>{
      return data['artists'].items;
    }));
   }

   getArtist(id:string){
     return this.getQuery(`artists/${id}`);

   }

   getTopTracks(id:string){
     return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data=>data['tracks']));
   }
}
