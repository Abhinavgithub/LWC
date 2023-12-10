import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ToastContainer from 'lightning/toastContainer';
import Toast from 'lightning/toast';
export default class ToastMessagesComponent extends LightningElement {
  title;
  message;
  variant;

  connectedCallback() {
    const toastContainer = ToastContainer.instance();
    toastContainer.maxShown = 5;
    toastContainer.toastPosition = 'top-right';
  }

  get options() {
    return [
      { label: 'Error', value: 'Error' },
      { label: 'Warning', value: 'Warning' },
      { label: 'Success', value: 'Success' },
      { label: 'Info', value: 'Info' },
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
      variant: this.variant,
    });
    this.dispatchEvent(evt);
  }
  showLinkedNotification() {
    Toast.show(
      {
        label:
          'This is a toast title with a {0} placeholder link that gets replaced by labelLinks',
        labelLinks: [
          {
            url: 'https://www.lightningdesignsystem.com/components/toast/',
            label: 'Toast link',
          },
        ],
        message:
          'This message has a {0} placeholder link that gets replaced by from messageLinks',
        messageLinks: [
          {
            url: 'http://www.salesforce.com',
            label: 'Salesforce link',
          },
        ],
        mode: 'sticky',
        variant: this.variant,
        onclose: () => {
          // Do something after the toast is closed
        },
      },
      this
    );
  }
}
