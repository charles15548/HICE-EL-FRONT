import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudiosService } from 'src/app/services/audios.service';

@Component({
  selector: 'app-mainfooter',
  templateUrl: './mainfooter.component.html',
  styleUrls: ['./mainfooter.component.css']
})
export class MainfooterComponent implements OnInit {
   
 // @ViewChild('audioElement', { static: false }) audioElement: ElementRef;
  currentAudio: any;
  constructor(private audioService: AudiosService) { }

  ngOnInit(): void {
   this.obtenerAudio();
  }
    obtenerAudio():void{
      this.audioService.getCurrentAudio().subscribe(audio => { 
              this.currentAudio = audio;
          });
    }
}
