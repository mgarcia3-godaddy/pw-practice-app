import { test } from '../test-options';
import { PageManager } from '../page-objects/pageManager';
import  {faker } from '@faker-js/faker';

test('Parametrized Methods', async ({pageManager}) => {
    const randomfullName = faker.person.fullName();
    const randomEmail = `${randomfullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

    //await pm.navigateTo().formLayoutsPage();
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME1, process.env.PASSWORD1, 'Option 1');
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomfullName, randomEmail, true);

});