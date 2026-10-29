import {test} from '../fixtures/pom-fixtures';
import {expect} from '@playwright/test';

test('login to orangeHRM', async ({ page, loginPage, dashboardPage, browserName }) => {
    const baseUrl = process.env.Base_URL!;
    const userName = process.env.User_Name!;
    const password = process.env.Password!;

    await loginPage.gotoOrangeHRM();
    await loginPage.logintoOrangeHRM(userName, password);
    const dashboardUrl = `${baseUrl}/web/index.php/dashboard/index`;
    await expect(page).toHaveURL(dashboardUrl);
    await expect(dashboardPage.dashboardHeading).toBeVisible();
    await page.context().storageState({ path: `auth-${browserName}.json` });
});

