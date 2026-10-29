import {test} from '../../fixtures/hooks-fixture';
import {expect} from '@playwright/test';


test('uses the saved authenticated session',{
    tag:['@smoke', '@regression'],
    annotation: { 
        type: 'Positive Test',
        description: 'Test ID: 101; Severity: Critical. Verifies that the user can access the dashboard with saved authentication.',
    }
},
  async ({ page, dashboardPage ,gotourl}) => {
  await expect(dashboardPage.dashboardHeading).toBeVisible();
})

test('sample test 2', {
    tag:['@smoke', '@regression'],
    annotation: { 
        type: 'Positive Test',
        description: 'Test ID: 102; Severity: Critical. Verifies the functionality of the sample test.',
    }
}, async ({ page, gotourl }) => {
  await expect(page).toHaveTitle('OrangeHRM');
});
