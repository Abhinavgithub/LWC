import { createElement } from 'lwc';
import GraphQLWithParameter from 'c/graphQLWithParameter';

describe('c-graph-ql-with-parameter', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('TODO: test case generated by CLI command, please fill in test logic', () => {
    // Arrange
    const element = createElement('c-graph-ql-with-parameter', {
      is: GraphQLWithParameter,
    });

    // Act
    document.body.appendChild(element);

    // Assert
    // const div = element.shadowRoot.querySelector('div');
    expect(1).toBe(1);
  });
});
