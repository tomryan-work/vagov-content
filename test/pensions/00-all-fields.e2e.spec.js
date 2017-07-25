const E2eHelpers = require('../e2e/e2e-helpers');
const Timeouts = require('../e2e/timeouts');
const PageHelpers = require('../e2e/pensions-helpers');
const testData = require('./schema/maximal-test.json');

const runTest = E2eHelpers.createE2eTest(
  (client) => {
    PageHelpers.initApplicationSubmitMock();

    // Ensure introduction page renders.
    client
      .url(`${E2eHelpers.baseUrl}/pension/application/527EZ`)
      .waitForElementVisible('body', Timeouts.normal)
      .assert.title('Apply for pension benefits: Vets.gov')
      .waitForElementVisible('.schemaform-title', Timeouts.slow)  // First render of React may be slow.
      .click('.usa-button-primary');

    E2eHelpers.overrideVetsGovApi(client);
    E2eHelpers.overrideSmoothScrolling(client);
    E2eHelpers.expectNavigateAwayFrom(client, '/introduction');

    // Applicant Information page
    client.waitForElementVisible('input[name="root_veteranFullName_first"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeApplicantInformation(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/applicant-information');

    // Military History page
    client.waitForElementVisible('input[name="root_servicePeriods_0_serviceBranch"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMilitaryHistory(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/military/history');

    client.waitForElementVisible('label[for="root_view:serveUnderOtherNames"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeGeneralMilitaryInfo(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/military/general');

    client.waitForElementVisible('label[for="root_nationalGuardActivation"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeNationalGuard(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/military/reserve-national-guard');

    client.waitForElementVisible('label[for="root_view:powStatus"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completePOW(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/military/pow-severance');

    // Work History page

    client.waitForElementVisible('label[for="root_disabilities_0_name"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeDisabilityHistory(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/disability/history');

    client.waitForElementVisible('label[for="root_view:workedBeforeDisabled"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeWorkHistory(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/employment/history');

    // marriage info
    client.waitForElementVisible('label[for="root_maritalStatus"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMaritalStatus(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/marriage-info');

    // first marriage
    client.waitForElementVisible('label[for="root_spouseFullName_first"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMarriage(client, testData.data, 0);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/marriages/0');

    // second marriage
    client.waitForElementVisible('label[for="root_spouseFullName_first"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMarriage(client, testData.data, 1);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/marriages/1');

    // spouse info
    client.waitForElementVisible('label[for="root_spouseDateOfBirth"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeSpouseInfo(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/spouse-info');

    // spouse marriage
    client.waitForElementVisible('label[for="root_dateOfMarriage"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeSpouseMarriage(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/spouse-marriages/0');

    // dependents
    client.waitForElementVisible('label[for="root_view:hasDependents"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeDependents(client, testData.data);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');

    // dependent info
    client.waitForElementVisible('label[for="root_childPlaceOfBirth"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeDependentInfo(client, testData.data, 0);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/dependents/children/information/0');

    // dependent address info
    client.waitForElementVisible('label[for="root_childInHousehold"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeDependentAddressInfo(client, testData.data, 0);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/dependents/children/address/0');

    // second dependent info
    client.waitForElementVisible('label[for="root_childPlaceOfBirth"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeDependentInfo(client, testData.data, 1);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/dependents/children/information/1');

    // second dependent address info
    client.waitForElementVisible('label[for="root_childInHousehold"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeDependentAddressInfo(client, testData.data, 1);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household/dependents/children/address/0');

    // Financial disclosure page
    // net worth info
    client.waitForElementVisible('label[for="root_netWorth_bank"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeNetWorthInfo(client, testData.data.netWorth);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/netWorth');

    // monthly income info
    client.waitForElementVisible('label[for="root_monthlyIncome_socialSecurity"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMonthlyIncomeInfo(client, testData.data.monthlyIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/monthlyIncome');

    // expected income info
    client.waitForElementVisible('label[for="root_expectedIncome_salary"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeExpectedIncomeInfo(client, testData.data.expectedIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/expectedIncome');

    // other expenses info
    client.waitForElementVisible('label[for="root_view:hasOtherExpensesYes"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    client.selectYesNo('root_view:hasOtherExpenses', testData.data['view:hasOtherExpenses']);
    PageHelpers.completeOtherExpensesInfo(client, testData.data.otherExpenses[0]);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/otherExpenses');

    // spouse net worth info
    client.waitForElementVisible('label[for="root_spouseNetWorth_bank"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeNetWorthInfo(client, testData.data.spouseNetWorth);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/netWorth/spouse');

    // spouse monthly income info
    client.waitForElementVisible('label[for="root_spouseMonthlyIncome_socialSecurity"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMonthlyIncomeInfo(client, testData.data.spouseMonthlyIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/monthlyIncome/spouse');

    // spouse expected income info
    client.waitForElementVisible('label[for="root_spouseExpectedIncome_salary"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeExpectedIncomeInfo(client, testData.data.spouseExpectedIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/expectedIncome/spouse');

    // spouse other expenses info
    client.waitForElementVisible('label[for="root_view:spouseHasOtherExpensesYes"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    client.selectYesNo('root_view:spouseHasOtherExpenses', testData.data['view:spouseHasOtherExpenses']);
    PageHelpers.completeOtherExpensesInfo(client, testData.data.spouseOtherExpenses[0], 'spouseOther');
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/otherExpenses/spouse');

    // first dependent net worth info
    client.waitForElementVisible('label[for="root_netWorth_bank"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeNetWorthInfo(client, testData.data.dependents[0].netWorth);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/netWorth/dependents/0');

    // first dependent income info
    client.waitForElementVisible('label[for="root_monthlyIncome_socialSecurity"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMonthlyIncomeInfo(client, testData.data.dependents[0].monthlyIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/monthlyIncome/dependents/0');

    // first dependent expected income info
    client.waitForElementVisible('label[for="root_expectedIncome_salary"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeExpectedIncomeInfo(client, testData.data.dependents[0].expectedIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/expectedIncome/dependents/0');

    // first dependent other expenses info
    client.waitForElementVisible('label[for="root_view:hasOtherExpensesYes"]', Timeouts.normal);
    client.selectYesNo('root_view:hasOtherExpenses', testData.data.dependents[0]['view:hasOtherExpenses']);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeOtherExpensesInfo(client, testData.data.dependents[0].otherExpenses[0]);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/otherExpenses/dependents/0');

    // second dependent net worth info
    client.waitForElementVisible('label[for="root_netWorth_bank"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeNetWorthInfo(client, testData.data.dependents[1].netWorth);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/netWorth/dependents/1');

    // second dependent income info
    client.waitForElementVisible('label[for="root_monthlyIncome_socialSecurity"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeMonthlyIncomeInfo(client, testData.data.dependents[1].monthlyIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/monthlyIncome/dependents/1');

    // second dependent expected income info
    client.waitForElementVisible('label[for="root_expectedIncome_salary"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeExpectedIncomeInfo(client, testData.data.dependents[1].expectedIncome);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/expectedIncome/dependents/1');

    // second dependent other expenses info
    client.waitForElementVisible('label[for="root_view:hasOtherExpensesYes"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    client.selectYesNo('root_view:hasOtherExpenses', testData.data.dependents[1]['view:hasOtherExpenses']);
    PageHelpers.completeOtherExpensesInfo(client, testData.data.dependents[1].otherExpenses[0]);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/financial-disclosure/otherExpenses/dependents/1');

    // Additional Information page
    // direct deposit
    client.waitForElementVisible('label[for="root_view:noDirectDeposit"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeDirectDepositInfo(client, testData.data.bankAccount);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/additional-information/direct-deposit');

    // contact information
    client.waitForElementVisible('label[for="root_veteranAddress_country"]', Timeouts.normal);
    client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(1)', 'progress-segment-complete');
    PageHelpers.completeContactInfo(client, testData.data.veteranAddress);
    client.axeCheck('.main')
      .click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/additional-information/contact');

    // Document Upload page
    client.end();
  }
);

if (process.env.BUILDTYPE !== 'production') {
  module.exports = runTest;
}