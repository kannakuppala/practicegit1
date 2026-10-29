import {Page, Locator} from '@playwright/test';

export class LeftNavigationbar{
    readonly page:Page;
    readonly pimbutton:Locator;

    constructor(page:Page){
        this.page=page;
        this.pimbutton=page.locator("//span[text()='PIM']");
    }
     /**
      * To click on the PIM button in the left navigation bar of the OrangeHRM application
      */
    async clickPIMButton(){
        await this.pimbutton.click();
    }
}