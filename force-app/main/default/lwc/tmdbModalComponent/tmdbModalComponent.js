import { api } from 'lwc';
import lightningModal from 'lightning/modal';
import getMovieDetails from '@salesforce/apex/TMDBApi.getMovieDetails';
import { updateRecord } from 'lightning/uiRecordApi';

export default class TmdbModalComponent extends lightningModal {
  @api tmdbId;
  @api rowId;
  loadingSpinner = true;
  movie;
  tagline;
  status;
  error;
  tmdb;
  connectedCallback() {
    getMovieDetails({ movieId: this.tmdbId }).then((resp) => {
      console.log('resp=' + resp);
      this.loadingSpinner = false;
      this.tmdb = JSON.parse(resp);
      this.movie = JSON.parse(resp).original_title;
      this.tagline = JSON.parse(resp).tagline;
      this.status = JSON.parse(resp).status;
      this.runtime = JSON.parse(resp).runtime;
      this.revenue = JSON.parse(resp).revenue;
    });
  }
  updateTMDB(tmdb) {
    let recordId = this.rowId;
    let recordInput = {
      fields: {
        Id: recordId,
        Overview__c: tmdb.overview,
      },
    };
    updateRecord(recordInput)
      .then(() => {
        // Record updated successfully
        console.log('Record updated successfully');
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating record:', error);
      });
  }
  handleOkay() {
    console.log('tmdbId=' + this.tmdbId);
    console.log('movie=' + this.movie);
    this.updateTMDB(this.tmdb);
    this.close('okay');
  }
  handleClick() {
    this.showModal = true;
  }
}
