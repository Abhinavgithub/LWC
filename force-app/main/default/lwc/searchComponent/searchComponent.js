import { LightningElement } from "lwc";
export default class SearchComponent extends LightningElement {
  searchTerm;
  handleChange(event) {
    const val = event.target.value;
    this.searchTerm = val;
    const searchEvent = new CustomEvent("search", {
      detail: this.searchTerm
    });
    this.dispatchEvent(searchEvent);
  }
}
