import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import DESC_FIELD from '@salesforce/schema/Contact.Description';
import ID_FIELD from '@salesforce/schema/Contact.Id';
import { updateRecord } from 'lightning/uiRecordApi';

const FIELDS = [EMAIL_FIELD, LAST_NAME_FIELD, DESC_FIELD, ID_FIELD];

export default class TmdbQuickActionComponent extends LightningElement {
  @api recordId;
  @api objectApiName;
  @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
  contact;

  get email() {
    return getFieldValue(this.contact.data, EMAIL_FIELD);
  }
  get lastName() {
    return getFieldValue(this.contact.data, LAST_NAME_FIELD);
  }
  get description() {
    return getFieldValue(this.contact.data, DESC_FIELD);
  }

  handleClose() {
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  handleSubmit() {
    const allValid = [
      ...this.template.querySelectorAll('lightning-input'),
    ].reduce((validSoFar, inputFields) => {
      inputFields.reportValidity();
      return validSoFar && inputFields.checkValidity();
    }, true);

    if (allValid) {
      // Create the recordInput object
      const fields = {};
      fields[ID_FIELD.fieldApiName] = this.recordId;
      fields[EMAIL_FIELD.fieldApiName] = this.template.querySelector(
        "[data-field='Email']"
      ).value;
      fields[LAST_NAME_FIELD.fieldApiName] = this.template.querySelector(
        "[data-field='LastName']"
      ).value;
      fields[DESC_FIELD.fieldApiName] = this.template.querySelector(
        "[data-field='Description']"
      ).value;

      const recordInput = { fields };

      updateRecord(recordInput)
        .then(() => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: 'Success',
              message: 'Contact updated',
              variant: 'success',
            })
          );
          // Display fresh data in the form
        })
        .catch((error) => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: 'Error creating record',
              message: error.body.message,
              variant: 'error',
            })
          );
        });
    } else {
      // The form is not valid
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Something is wrong',
          message: 'Check your input and try again.',
          variant: 'error',
        })
      );
    }
    this.dispatchEvent(new CloseActionScreenEvent());
  }
}
