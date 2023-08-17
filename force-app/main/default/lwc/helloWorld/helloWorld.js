import { LightningElement, track } from "lwc";

export default class HelloWorld extends LightningElement {
  @track name = "Abhinav";
  nameChange(event) {
    this.name = event.target.value;
  }
}
