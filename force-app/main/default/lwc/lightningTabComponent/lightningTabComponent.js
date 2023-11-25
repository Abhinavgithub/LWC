import { LightningElement, wire, track } from "lwc";
import getAccountListByCountry from "@salesforce/apex/TabAccountController.getAccountListByCountry";
const columns = [
  { label: "Id", fieldName: "Id" },
  { label: "Name", fieldName: "Name" },
  { label: "BillingCity", fieldName: "BillingCity" },
  { label: "BillingCountry", fieldName: "BillingCountry" },
  { label: "BillingStreet", fieldName: "BillingStreet" }
];

export default class LightningTabComponent extends LightningElement {
  country;
  @track accounts;
  error;
  columns = columns;
  showTabGermany;
  showTabUnitedStates;
  showTabItaly;

  @wire(getAccountListByCountry, { country: "$country" })
  wiredAccounts({ data, error }) {
    if (data) {
      this.accounts = data;
      this.error = undefined;
      console.log(this.accounts);
    } else {
      this.accounts = undefined;
      this.error = error;
    }
  }
  handleClick(event) {
    this.country = event.target.value;
    this.showTabGermany = this.country === "Germany" ? true : false;
    this.showTabUnitedStates = this.country === "United States" ? true : false;
    this.showTabItaly = this.country === "Italy" ? true : false;
    console.log("country = " + this.country);
    console.log("showTabGermany = " + this.showTabGermany);
    console.log("showTabUnitedStates = " + this.showTabUnitedStates);
    console.log("showTabItaly = " + this.showTabItaly);
  }
}
