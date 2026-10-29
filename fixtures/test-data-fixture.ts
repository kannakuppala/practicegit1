import { randomUUID } from 'node:crypto';
import { test as baseTest } from './hooks-fixture';

type EmployeeData = {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId?: string;
};

type TestDataFixtures = {
    employeeData: EmployeeData;
};

export const test = baseTest.extend<TestDataFixtures>({
    employeeData: async ({}, use) => {
        const id = randomUUID().slice(0, 8);

        await use({
            firstName: `First${id}`,
            middleName: `Middle${id}`,
            lastName: `Last${id}`,
            employeeId: `E${id}`,
        });
    },
});

export { expect } from '@playwright/test';
