import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

export default class GraphQLWithParameter extends LightningElement {
  records;
  errors;
  minAmount = '50000000';

  get minAmounts() {
    return [
      { label: 'Any', value: '0' },
      { label: '50000000', value: '50000000' },
      { label: '100000000', value: '100000000' },
      { label: '1000000000', value: '1000000000' },
    ];
  }

  @wire(graphql, {
    query: gql`
      query BigAccounts($minAmount: Currency) {
        uiapi {
          query {
            Account(where: { AnnualRevenue: { gte: $minAmount } }) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  AnnualRevenue {
                    displayValue
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: '$variables',
  })
  graphqlQueryResult({ data, errors }) {
    if (data) {
      this.records = data.uiapi.query.Account.edges.map((edge) => edge.node);
    }
    this.errors = errors;
  }
  handleChange(event) {
    this.minAmount = event.detail.value;
  }
  get variables() {
    return {
      minAmount: this.minAmount,
    };
  }
}
