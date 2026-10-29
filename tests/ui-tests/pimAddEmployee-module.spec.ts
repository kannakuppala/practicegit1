import{test , expect} from '../../fixtures/test-data-fixture';

test('Add Employee in PIM module', {
    tag:['@smoke', '@regression'],
    annotation: { 
        type: 'Positive Test',
        description: 'Test ID: 106; Severity: Critical. Verifies the functionality of adding an employee in the PIM module.',
    }
}, async ({ leftNavigationbar, pimPage ,gotourl,employeeData}) => { 
    test.step('Naviagte to dashboard', async () => {
        await gotourl;
    });
    test.step('Click on PIM button and add employee', async () => {
    await leftNavigationbar.clickPIMButton();
    });
    test.step('Fill employee details and save', async () => {
    await pimPage.addEmployee(employeeData.firstName, employeeData.middleName, employeeData.lastName, employeeData.employeeId);
    });
    await expect(pimPage.personalDetailsHeading).toBeVisible();
});