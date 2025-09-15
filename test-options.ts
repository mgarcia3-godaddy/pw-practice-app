import {test as base} from '@playwright/test';
import { PageManager } from '../pw-practice-app/page-objects/pageManager';
import { U } from '@faker-js/faker/dist/airline-CHFQMWko';

export type TestOptions = {
    globalsQaURL: string;
    formLayoutsPage: string;
    pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
    globalsQaURL: [ '', { option: true }],
    formLayoutsPage: async({page}, use) => {
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        await use('');
        console.log('Teardown');
    },

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page);
        await use(pm);
    }
});