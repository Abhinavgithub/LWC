import { LightningElement, wire } from 'lwc';
import getQuery from '@salesforce/apex/QueryController.getQuery';

export default class SoslQueryComponent extends LightningElement {
  searchKey = '';
  error;
  accounts = null;
  contacts = null;
  leads = null;
  results;
  @wire(getQuery, { keyword: '$searchKey' })
  wiredResults({ error, data }) {
    if (data) {
      this.results = data;
      this.error = undefined;
      if (
        this.results[0].length > 0 &&
        this.results[0] !== undefined &&
        this.results[0] !== null
      ) {
        this.accounts = this.results[0];
      } else {
        this.accounts = null;
      }
      if (
        this.results[1].length > 0 &&
        this.results[1] !== undefined &&
        this.results[1] !== null
      ) {
        this.contacts = this.results[1];
      } else {
        this.contacts = null;
      }
      if (
        this.results[2].length > 0 &&
        this.results[2] !== undefined &&
        this.results[2] !== null
      ) {
        this.leads = this.results[2];
      } else {
        this.leads = null;
      }
    } else if (error) {
      this.results = undefined;
      this.error = error;
      this.accounts = undefined;
      this.contacts = undefined;
      this.leads = undefined;
    }
  }

  handleKeyChange(event) {
    const searchKey = event.detail.value;
    if (
      (searchKey && searchKey.length > 2) ||
      searchKey === null ||
      searchKey === undefined ||
      searchKey === ''
    ) {
      this.searchKey = searchKey;
      console.log(this.searchKey);
    }
  }
}
