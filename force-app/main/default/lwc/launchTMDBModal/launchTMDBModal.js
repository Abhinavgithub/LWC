import { LightningElement, api, wire } from 'lwc';
import myMovieModal from 'c/tmdbModalComponent';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import TMDB_ID_FIELD from '@salesforce/schema/TMDB__c.TMDB_Id__c';
const fields = [TMDB_ID_FIELD];

export default class LaunchTMDBModal extends LightningElement {
  @api recordId;
  @wire(getRecord, { recordId: '$recordId', fields })
  tmdb;
  get tmdbId() {
    return getFieldValue(this.tmdb.data, TMDB_ID_FIELD);
  }

  async handleClick() {
    const result = await myMovieModal.open({
      // `label` is not included here in this example.
      // it is set on lightning-modal-header instead
      label: 'Movie Details',
      size: 'medium',
      description: "Accessible description of modal's purpose",
      tmdbId: this.tmdbId,
    });
    // if modal closed with X button, promise returns result = 'undefined'
    // if modal closed with OK button, promise returns result = 'okay'
    console.log(result);
  }
}
