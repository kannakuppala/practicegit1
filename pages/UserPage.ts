import {Page,Locator} from "@playwright/test";

export class UserPage{

    readonly page:Page;
    readonly userHeading:Locator;
    readonly logoutButton:Locator;

    constructor(page:Page){

        this.page=page;
        this.userHeading=page.locator('.oxd-userdropdown-tab');
        this.logoutButton=page.getByRole('menuitem', { name: 'Logout' });
    }

  async LogoutFromOrangeHRM(){
    await this.userHeading.click();
    await this.logoutButton.click();
  }
}