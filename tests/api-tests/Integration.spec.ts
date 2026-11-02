import {test} from '../../fixtures/hooks-fixture';
import {expect} from '@playwright/test';

/**
 * @description This test case verifies the logout functionality from the OrangeHRM application. It ensures that after logging out, the user is redirected to the login page.
 */

test('logout from orangeHRM', {
    tag:['@smoke'],
    annotation: { 
        type: 'Positive Test',
        description: 'Test ID: 105; Severity: Critical. Verifies the logout functionality from orangeHRM.',
    }
}, async ({ page, userPage, gotourl }) => {
    await userPage.LogoutFromOrangeHRM();
    await expect(page).toHaveURL(`${process.env.Base_URL}/web/index.php/auth/login`);
});