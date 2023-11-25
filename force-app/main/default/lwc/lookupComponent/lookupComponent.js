import { LightningElement } from "lwc";
import getRecords from "@salesforce/apex/LookupController.getRecords";

export default class LookupComponent extends LightningElement {
  objectName = "Account";
  fieldName = "Name";
  handleSearch(event) {
    const searchTerm = event.detail;
    getRecords({
      objectName: this.objectName,
      searchString: searchTerm,
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
