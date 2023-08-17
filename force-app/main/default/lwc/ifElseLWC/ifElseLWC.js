import { LightningElement } from "lwc";

export default class IfElseLWC extends LightningElement {
  toShow = false;
  disableShowButton = false;
  disableHideButton = true;
  ShowImage(event) {
    this.toShow = true;
    if (event.target.variant) {
      this.disableShowButton = true;
      this.disableHideButton = false;
    }
  }
  HideImage(event) {
    this.toShow = false;
    if (event.target.variant) {
      this.disableHideButton = true;
      this.disableShowButton = false;
    }
  }
}
