import {Locator, Page} from "@playwright/test";
export class LoginPage{

    readonly page:Page;
    readonly userNameInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;
    readonly errorMessage:Locator;

    constructor(page:Page){
        this.page=page;
        this.userNameInput=page.getByRole('textbox', { name: 'Username' });
        this.passwordInput=page.getByRole('textbox', { name: 'Password' });
        this.loginButton=page.getByRole('button', { name: 'Login' });
        this.errorMessage=page.getByText('Invalid credentials');
    }

    /**
     * To open the OrangeHRM login page
     * 
     */
    async gotoOrangeHRM(){
        await this.page.goto(`${process.env.Base_URL}/web/index.php/auth/login`);
    }

    /**
     * To log into the OrangeHRM application
     * @param userName 
     * @param password 
     */
    async logintoOrangeHRM(userName:string,password:string){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}