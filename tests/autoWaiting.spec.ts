import {expect, test} from '@playwright/test';
import { time } from 'console';

test.beforeEach(async ({page}, testInfo) => {
  await page.goto(process.env.URL);
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout + 2000); // Increase timeout for this test
});

test('Auto Waiting', async ({page}) => {
    const successButton = page.locator('.bg-success');

    await successButton.click();

    //const text = await successButton.textContent();

    // await successButton.waitFor({state: 'attached'});
    // const text = await successButton.allTextContents();
    // expect(text).toEqual('Data loaded with AJAX get request.');

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
});


test.skip('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success');

    // Wait for element
    await page.waitForSelector('.bg-success');

    // Wait for for particular response
    await page.waitForResponse('https://uitestingplayground.com/ajaxdata');

    // Wait for network calls to be completed NOT RECOMMENDED)
    await page.waitForLoadState('networkidle');

    const text = await successButton.allTextContents();
    expect(text).toEqual('Data loaded with AJAX get request.');
});

test.skip('timeouts', async ({page}) => {
    //test.setTimeout(10000); // 10 seconds for this test
    test.slow(); // Slow down the test execution
    const successButton = page.locator('.bg-success');
    await successButton.click({timeout: 16000});
});