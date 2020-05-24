/// <reference types="cypress" />
const linkCheck = require('link-check');

function t

describe('Landing', () => {
  it('check all links are valid', () => {
    cy.visit('/');
    cy.get('a').each(([link]) => {
      expect(link.href).not.to.be.undefined;
      linkCheck(link.href, err => {
        expect(err).to.be.null;
      });
    });
  });

});
