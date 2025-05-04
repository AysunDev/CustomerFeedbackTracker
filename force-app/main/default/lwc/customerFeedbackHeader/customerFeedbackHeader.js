import { LightningElement } from 'lwc';
import logo from '@salesforce/resourceUrl/salesforceLogo'; // Your static resource name

export default class CustomerFeedbackHeader extends LightningElement {
    logoUrl = logo;

    handleProvideFeedback() {
        console.log('Provide Feedback button clicked');
        // Add flow navigation logic here if needed
    }
}

