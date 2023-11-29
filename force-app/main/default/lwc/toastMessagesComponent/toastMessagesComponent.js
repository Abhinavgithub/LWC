import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class ToastMessagesComponent extends LightningElement {
  title;
  message;
  variant;

  get options() {
    return [
      { label: "Error", value: "Error" },
      { label: "Warning", value: "Warning" },
      { label: "Success", value: "Success" },
      { label: "Info", value: "Info" }
    ];
  }
  titleChange(event) {
    this.title = event.target.value;
  }
  messageChange(event) {
    this.message = event.target.value;
  }
  variantChange(event) {
    this.variant = event.target.value;
  }
  showNotification() {
    const evt = new ShowToastEvent({
      title: this.title,
      message: this.message,
      variant: this.variant
    });
    this.dispatchEvent(evt);
  }
}
