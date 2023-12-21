import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpotifyService } from 'src/app/services/spotify-service.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent implements OnInit {
  randomTrack;
  link;
  trackID;
  constructor(
    private spotifyService: SpotifyService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}
  getAccessToken() {
    this.spotifyService
      .getAccessToken()
      .subscribe((response: { access_token }) => {
        localStorage.setItem('access-token', response.access_token);
        console.log(response);
      });
    this.getATrack();
  }

  getATrack() {
    this.spotifyService.getTracks().subscribe((response: { tracks }) => {
      let allTracks = response.tracks.items.length;
      const randomNumber = Math.floor(Math.random() * allTracks);
      console.log(response);
      this.link =
        response.tracks.items[randomNumber].track.external_urls.spotify;
      this.trackID = response.tracks.items[randomNumber].track.id;
    });
  }
}
