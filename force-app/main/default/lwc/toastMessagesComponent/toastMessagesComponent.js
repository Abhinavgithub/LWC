import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ToastContainer from "lightning/toastContainer";
export default class ToastMessagesComponent extends LightningElement {
  title;
  message;
  variant;

  connectedCallback() {
    const toastContainer = ToastContainer.instance();
    toastContainer.maxShown = 5;
    toastContainer.toastPosition = "top-right";
  }

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
  showLinkedNotification() {
    const linkedevt = new ShowToastEvent({
      title: this.title,
      variant: this.variant,
      message: "See it {0}!",
      messageData: [
        "Salesforce",
        {
          url: "http://www.salesforce.com/",
          label: "here"
        }
      ]
    });
    this.dispatchEvent(linkedevt);
  }
}
