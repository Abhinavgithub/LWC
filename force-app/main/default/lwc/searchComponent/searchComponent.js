import { LightningElement } from "lwc";
import getRecords from "@salesforce/apex/LookupController.getRecords";
export default class SearchComponent extends LightningElement {
  searchTerm;
  objectName;
  fieldName;
  handleChange(event) {
    const val = event.target.value;
    this.searchTerm = val;
    console.log("searchTerm = " + this.searchTerm);
    getRecords({
      objectName: this.objectName,
      searchString: this.searchTerm,
      fieldName: this.fieldName
    })
      .then((result) => {
        console.log("Records = " + result);
      })
      .catch((error) => {
        console.log("Error = " + error);
      });
  }
}
