// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import 'cypress-localstorage-commands';
import { GENERIC_SELECTORS } from '../../constants/generic/IdConstants';
import { apiUtils as api, routeUtils as route } from '../../utils';

function getMicrosoftLoginButton() {
  return cy.get(GENERIC_SELECTORS.login.microsoftLoginButton);
}

// Parameters:
//   - options: dict with properties:
//     - url (optional): URL to navigate to after login
//     - workspaceId (optional): id of the workspace to open (required for interceptions when stubbing is enabled)
//     - scenarioId (optional): id of the scenario to open (required for interceptions when stubbing is enabled)
//     - onBrowseCallback (optional): callback function that will be called after setting the interceptions
//     - expectedURL (optional): can be set if expected URL after navigation is different from options.url (checked
//       with "include" assertion)
function login(options) {
  cy.clearLocalStorageSnapshot();

  const reqAuthAlias = api.interceptAuthentication();
  route.browse({
    url: '/',
    onBrowseCallback: () => getMicrosoftLoginButton().click(),
    ...options,
  });
  api.waitAlias(reqAuthAlias, { timeout: 60 * 1000 });

  cy.saveLocalStorage();
}

// Parameters:
//   - options: dict with properties:
//     - url (optional): URL to navigate to after login
//     - workspaceId (optional): id of the workspace to open (required for interceptions when stubbing is enabled)
//     - scenarioId (optional): id of the scenario to open (required for interceptions when stubbing is enabled)
//     - onBrowseCallback (optional): callback function that will be called after setting the interceptions
//     - expectedURL (optional): can be set if expected URL after navigation is different from options.url (checked
//       with "include" assertion)
function relogin(options) {
  Cypress.Cookies.preserveOnce('ai_session', 'ai_user');
  cy.restoreLocalStorage();
  route.browse({ url: '/', ...options });
}

export const Login = {
  getMicrosoftLoginButton,
  login,
  relogin,
};
