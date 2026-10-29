import {test as basetest} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { DashboardPage } from '../pages/Dashboardpage';
import {UserPage} from '../pages/UserPage';
import { LeftNavigationbar } from '../pages/LeftNavigationbar';
import { PIMPage } from '../pages/PIMPage';

type TestFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    userPage: UserPage;
    leftNavigationbar: LeftNavigationbar;
    pimPage: PIMPage;

};

export const test = basetest.extend<TestFixtures>({
    loginPage:async({page},use)=>{
        await use(new LoginPage(page));
    },

    dashboardPage:async({page},use)=>{
        await use(new DashboardPage(page));
    },
    userPage:async({page},use)=>{
        await use(new UserPage(page));
    },
    leftNavigationbar:async({page},use)=>{
        await use(new LeftNavigationbar(page));
    },
    pimPage:async({page},use)=>{
        await use(new PIMPage(page));
    }
});