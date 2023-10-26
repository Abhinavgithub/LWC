import { LightningElement } from "lwc";

export default class Calculator extends LightningElement {
  number1;
  number2;
  result;
  disabled = false;

  handleChangeEvent(event) {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "number1") {
      this.number1 = value;
    } else if (name === "number2") {
      this.number2 = value;
    }
  }
  sum() {
    this.disabled = true;
    this.result = parseInt(this.number1, 10) + parseInt(this.number2, 10);
  }
  difference() {
    this.disabled = true;
    this.result = parseInt(this.number1, 10) - parseInt(this.number2, 10);
  }
  product() {
    this.disabled = true;
    this.result = parseInt(this.number1, 10) * parseInt(this.number2, 10);
  }
  division() {
    this.disabled = true;
    this.result = parseInt(this.number1, 10) / parseInt(this.number2, 10);
  }
  reset() {
    this.disabled = false;
    this.result = "";
  }
}
