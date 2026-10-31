import {test} from '../../fixtures/hooks-fixture';
import {expect} from '@playwright/test';



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