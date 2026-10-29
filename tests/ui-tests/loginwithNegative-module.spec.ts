import {test, expect} from '../../fixtures/hooks-fixture';
import loginData from '../../test-data/ui-data/loginwithwrongcredentials-data.json';

test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Login with wrong credentials', {
    tag: ['@smoke', '@regression'],
    annotation: {
        type: 'Negative Test Suite',
        description: 'Verifies that invalid credential combinations are rejected.',
    },
}, () => {

test('login with wrong password', {
    annotation: { 
        type: 'Negative Test',
        description: 'Test ID: 102; Severity: Critical. Verifies login behavior with a wrong password.',
    }
}, async ({ loginPage }) => {
    await loginPage.gotoOrangeHRM();
    await loginPage.logintoOrangeHRM(process.env.User_Name as string, loginData.wrongcredentials.password);
    await expect(loginPage.errorMessage).toHaveText(loginData.wrongcredentials.expectedErrorMessage);
    
});
test('login with wrong username', {
    annotation: { 
        type: 'Negative Test',
        description: 'Test ID: 103; Severity: Critical. Verifies login behavior with a wrong username.',
    }
}, async ({ loginPage }) => {
    await loginPage.gotoOrangeHRM();
    await loginPage.logintoOrangeHRM(loginData.wrongcredentials.username, process.env.Password as string);
    await expect(loginPage.errorMessage).toHaveText(loginData.wrongcredentials.expectedErrorMessage);
});
test('login with wrong username and password', {
    annotation: { 
        type: 'Negative Test',
        description: 'Test ID: 104; Severity: Critical. Verifies login behavior with a wrong username and password.',
    }
}, async ({ loginPage }) => {
    await loginPage.gotoOrangeHRM();
    await loginPage.logintoOrangeHRM(loginData.wrongcredentials.username, loginData.wrongcredentials.password);
    await expect(loginPage.errorMessage).toHaveText(loginData.wrongcredentials.expectedErrorMessage);
});
});