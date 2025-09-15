import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import  {faker } from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Navigate to form page @smoke @regression', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});

test('Parametrized Methods @smoke', async ({page}) => {
    const pm = new PageManager(page);
    const randomfullName = faker.person.fullName();
    const randomEmail = `${randomfullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME1, process.env.PASSWORD1, 'Option 1');
    await page.screenshot({path: `screenshots/formsLayoutsPage.png`});
    const buffer = await page.screenshot();
    console.log(buffer.toString('base64'));
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomfullName, randomEmail, true);
    await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: `screenshots/inlineForm.png`});
    await pm.navigateTo().datepickerPage();
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
    await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(7, 14);
});

test.only('testing with argos ci', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
});