import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';



@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent  {

  artista : any={};
  loading : boolean;
  topTracks : any[]=[];
  canciones : any[]=[];



  constructor(private router:ActivatedRoute, private spotify :SpotifyService) {
    this.router.params.subscribe(params=>{
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);


    })
   }

  getArtista(id:string){
    this.loading=true;
  this.spotify.getArtist(id)
    .subscribe(artista =>{

      this.artista = artista;
      this.loading=false;
    })
  }

  getTopTracks(id:string ){
    this.spotify.getTopTracks(id)
    .subscribe(topTracks=>{
      //console.log(topTracks);
      this.topTracks = topTracks;
    })
  }

  ////////////////////////////////////
/*agregamos todo el item a un array el cual lo declaramos anteriormente canciones: any[]= [] */
  agregar(item:any){
    this.canciones.push(item);
    for(let i = 0; i<=this.canciones.length;i++){
      console.log(this.canciones[i]);
    }
  }

  //eliminamos el elemento de la lista
  eliminar(item:any){
     let indice = this.canciones.indexOf(item);
     indice !== -1 && this.canciones.splice(indice,1);
    console.log(indice);
  }



}
