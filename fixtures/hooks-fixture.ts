import { test as baseTest } from './pom-fixtures';

type HooksFixtures = {
    gotourl: void;
};

export const test = baseTest.extend<HooksFixtures>({
    gotourl: async ({ page }, use) => {
        await page.goto(`${process.env.Base_URL}/web/index.php/dashboard/index`);
        await use();
    },
});

export { expect } from '@playwright/test';