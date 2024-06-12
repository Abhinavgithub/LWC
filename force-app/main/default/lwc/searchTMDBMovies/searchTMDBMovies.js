import { LightningElement } from 'lwc';

export default class SearchTMDBMovies extends LightningElement {
  options;
  value;
  connectedCallback() {
    const currentYear = new Date().getFullYear();
    const yearRange = 100; // Adjust the range as needed
    const years = [];
    for (let i = currentYear - yearRange; i <= currentYear; i++) {
      years.push({ label: `${i}`, value: i });
    }
    this.options = years;
  }
  handleYearSelection(event) {
    this.value = event.detail.value;
  }
}
