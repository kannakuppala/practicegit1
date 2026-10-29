import {Page, Locator} from '@playwright/test';

export class PIMPage{
    readonly page:Page;

    readonly addEmployeeButton:Locator;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly middleNameInput:Locator;
    readonly employeeIdInput:Locator;
    readonly saveButton:Locator;
    readonly personalDetailsHeading:Locator;

    constructor(page:Page){
        this.page=page;
        this.addEmployeeButton=page.getByRole('link', { name: 'Add Employee' });
        this.firstNameInput=page.getByRole('textbox', { name: 'First Name' });
        this.middleNameInput=page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameInput=page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIdInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .getByRole('textbox');
        this.saveButton=page.getByRole('button', { name: 'Save' });
        this.personalDetailsHeading=page.getByRole('heading', { name: 'Personal Details' });
    }

    /**
     * To add an employee in the OrangeHRM application in the PIM module
     * @param firstName 
     * @param middleName 
     * @param lastName 
     * @param employeeId 
     */
    async addEmployee(firstName:string, middleName:string, lastName:string, employeeId?:string){
        await this.addEmployeeButton.click();
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);
        if (employeeId) {
            await this.employeeIdInput.fill(employeeId);
        }
        await this.saveButton.click();
    }
}