import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment.prod';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiURL = 'https://api.spotify.com/v1';

  constructor(
    private httpClient: HttpClient,
    private oauthService: OAuthService
  ) {}

  getTracks() {
    let playlistID = '4JtH8nrDzFYUKdvRkSkYPQ?si=fd1f9d30cf044e39';
    if (!localStorage.getItem('access-token')) {
      this.getAccessToken();
    }
    return this.httpClient
      .get(`${this.apiURL}/playlists/${playlistID}/tracks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      })
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }

  getAccessToken() {
    let body =
      `grant_type=client_credentials&client_id=${environment.client_id}&client_secret=${environment.client_secret}`;

    return this.httpClient
      .post('https://accounts.spotify.com/api/token', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }
}
