import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { CheckStampDutyPage } from '../pages/check-stamp-duty-page';
import { CalculatorPage } from '../pages/calculator-page'

const { Given, When, Then } = createBdd();

let checkStampDutyPage: CheckStampDutyPage;
let calculatorPage: CalculatorPage;

Given('I am on the Check Motor Vehicle Stamp Duty page', async ({ page }) => {
    checkStampDutyPage = new CheckStampDutyPage(page);
    await checkStampDutyPage.goto();
});

When('I click on Check online button', async ({ page }) => {
    await checkStampDutyPage.checkStampDutyOnline();
});

When('I go to the Motor vehicle registration duty calculator page', async ({ page }) => {
    calculatorPage = new CalculatorPage(page);
    const headingText = await calculatorPage.getPageHeadingText();
    expect(headingText?.trim()).toEqual('Revenue NSW calculators');
});

When('I select Registration for passenger vehicle as Yes', async ({ page }) => {
    await calculatorPage.selectYesOption();
});

When('I enter purchase price as {int}', async ({ page }, amount: number) => {
    await calculatorPage.fillPurchaseValue(amount.toString());
});

When('I click on Calculate button', async ({ page }) => {
    await calculatorPage.clickCalculateBtn();
    await expect(calculatorPage.getCalculatePopUpHeading()).toBeVisible();
});

Then('I should see the stamp duty values successfully calculated in a popup for purchase price {int}', async ({ page }, amount: number) => {
    await expect(calculatorPage.getCalculatePopUpContents().first()).toContainText('Motor vehicle registration');
    await expect(calculatorPage.getCalculatePopUpContents().nth(1)).toContainText('Details entered:');
    await expect(calculatorPage.getCalculatePopUpContents().nth(2)).toContainText('Is this registration for a passenger vehicle?');
    await expect(calculatorPage.getCalculatePopUpContents().nth(2)).toContainText('Yes');
    await expect(calculatorPage.getCalculatePopUpContents().nth(3)).toContainText('Purchase price or value');

    // convert string to currency format - utility
    const currencyFormatter = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
    });
    const formattedAmount = currencyFormatter.format(amount);
    await expect(calculatorPage.getCalculatePopUpContents().nth(3)).toContainText(formattedAmount);

    await expect(calculatorPage.getCalculatePopUpContents().nth(4)).toContainText('Result:');
    await expect(calculatorPage.getCalculatePopUpContents().nth(5)).toContainText('Duty payable');
});
