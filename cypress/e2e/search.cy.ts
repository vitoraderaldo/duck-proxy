describe('Search', () => {
  const baseUrl = 'http://localhost:3000';

  const performSearch = (searchFor: string) => {
    cy.visit(baseUrl);
    cy.get('input[id="search"]').type(searchFor);
    cy.get('button[id="search-button"]').click();

    cy.get('div[id="pagination-buttons"] li[aria-label="pagination item 1 active"]')
      .should('contain', '1');
  };

  const navigateToPage = (pageNumber: number) => {
    cy.get(`div[id="pagination-buttons"] li[aria-label="pagination item ${pageNumber}"]`)
    .should('contain', pageNumber)
    .click();
  };

  const verifySearchResults = (searchFor: string, pageNumber: number) => {
    cy.url()
      .should('include', `/search?query=${searchFor}&page=${pageNumber}&locale=en-US`);

    cy.get('div[id="highlighted-count"] h3')
      .should('contain', `mentions on page ${pageNumber}`);

    cy.get(`div[id="result-0"]`)
      .get('h3')
      .should('not.be.empty');

    cy.get(`div[id="result-0"]`)
      .get('p')
      .should('not.be.empty');

    cy.get(`div[id="result-0"] a`)
      .should('have.attr', 'href')
      .and('not.be.empty');

    cy.get(`div[id="result-1"] h3`)
      .should('not.be.empty');
  
    cy.get(`div[id="result-1"] p`)
      .should('not.be.empty');
  };

  const verifyHistoryResults = (
    search: string,
    page: number,
  ) => {
    cy.get('header button[id="history"]')
      .contains('History')
      .click();

    cy.get('header div[id="history-modal"] h3')
      .contains('History');

    const firstItem = cy.get('div[id="history-modal"] a[id="history-item-0"]')

    firstItem.should('have.attr', 'href', `/search?query=${search}&page=${page}&locale=en-US`);

    firstItem.get('h4').contains(search);
    firstItem.get('h5').contains(new Date().getUTCDate());
  }

  const navigateToHistory = (
    search: string,
    index: number
  ) => {
    cy.get('header button[id="history"]')
      .contains('History')
      .click();

    const item = cy
      .get(`div[id="history-modal"]`)
      .get(`a[id="history-item-${index}"]`);

    item.should('have.attr', 'href', `/search?query=${search}&page=1&locale=en-US`);

    // item.get('h4').contains(search);
    // item.get('h5').contains(new Date().getUTCDate());
  }


  it('should find results when searching', () => {
    performSearch('javascript');
    verifySearchResults('javascript', 1);
    verifyHistoryResults('javascript', 1);
  });

  it('should navigate to page 2', () => {
    performSearch('javascript');
    navigateToPage(2);
    verifySearchResults('javascript', 2);
  });

  it.only('should search using the history', async () => {
    performSearch('first'); // [2]
    cy.wait(10000);

    performSearch('second'); // [1]
    cy.wait(5000);

    performSearch('third'); // [0]
    cy.wait(5000);

    navigateToPage(4);

    navigateToHistory('first', 2);
  })


});
