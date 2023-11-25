import { LightningElement, api } from "lwc";

export default class SummaryComponent extends LightningElement {
  @api title = "Summary Title";
  @api summary =
    "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.";
  @api open = false;
  handleClick() {
    // eslint-disable-next-line @lwc/lwc/no-api-reassignments
    this.open = !this.open;
  }
  get SummaryIcon() {
    return this.open ? "utility:chevrondown" : "utility:chevronright";
  }
  get ClassCSS() {
    return this.open
      ? "slds-summary-detail slds-is-open"
      : "slds-summary-detail";
  }
}
