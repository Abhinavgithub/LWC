import { api } from 'lwc';
import lightningModal from 'lightning/modal';
import getMovieDetails from '@salesforce/apex/TMDBApi.getMovieDetails';

export default class TmdbModalComponent extends lightningModal {
  @api tmdbId;
  loadingSpinner = true;
  movie;
  tagline;
  status;
  error;

  connectedCallback() {
    getMovieDetails({ movieId: this.tmdbId }).then((resp) => {
      console.log('resp=' + resp);
      this.loadingSpinner = false;
      this.movie = JSON.parse(resp).original_title;
      this.tagline = JSON.parse(resp).tagline;
      this.status = JSON.parse(resp).status;
      this.runtime = JSON.parse(resp).runtime;
      this.revenue = JSON.parse(resp).revenue;
    });
  }

  handleOkay() {
    console.log('tmdbId=' + this.tmdbId);
    console.log('movie=' + this.movie);
    this.close('okay');
  }
  handleClick() {
    this.showModal = true;
  }
}
