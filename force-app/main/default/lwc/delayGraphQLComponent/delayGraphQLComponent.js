import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

export default class DelayGraphQLComponent extends LightningElement {
  initialValue = '';
  records;
  errors;
  isLoading = false;
  displayInfo = {
    additionalFields: ['Industry'],
  };
  matchingInfo = {
    primaryField: { fieldPath: 'Name' },
    additionalFields: [{ fieldPath: 'Industry' }],
  };
  handleChange(event) {
    this.initialValue = event.detail.recordId;
  }
  filter = {
    criteria: [
      {
        fieldPath: 'Active__c',
        operator: 'eq',
        value: 'Yes',
      },
    ],
  };
  @wire(graphql, {
    query: '$accountQuery',
    variables: '$variables',
  })
  graphqlQueryResult({ data, errors }) {
    if (data) {
      this.records = data.uiapi.query.Contact.edges.map((edge) => edge.node);
    }
    this.isLoading = false;
    this.errors = errors;
  }
  get variables() {
    return {
      accountId: this.initialValue,
    };
  }
  get accountQuery() {
    if (!this.initialValue) return undefined;
    this.isLoading = true;
    return gql`
      query contactsOnAccount($accountId: ID!) {
        uiapi {
          query {
            Contact(where: { AccountId: { eq: $accountId } }) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  Email {
                    value
                  }
                  Phone {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;
  }
}
