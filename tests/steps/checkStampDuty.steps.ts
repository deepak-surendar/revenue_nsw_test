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
    await expect(calculatorPage.getCalculatePopUpTitleElement()).toBeVisible({ timeout: 10_000 });
});

Then('I should see the stamp duty values successfully calculated in a popup for purchase price {int}', async ({ page }, amount: number) => {
    // await calculatorPage.waitForCalculationPopUp();
    // await expect(calculatorPage.getCalculatePopUpTitleElement()).toBeVisible();

    const headerText = await calculatorPage.getCalculatePopUpTitle();
    expect(headerText).toEqual('Calculation');

    const popUpContents = await calculatorPage.getCalculatePopUpContents();
    expect(popUpContents[2]).toContain('Is this registration for a passenger vehicle?');
    expect(popUpContents[2]).toContain('Yes');
    expect(popUpContents[3]).toContain('Purchase price or value');

    const currencyFormatter = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
    });

    const formattedAmount = currencyFormatter.format(amount);
    expect(popUpContents[3]).toContain(formattedAmount);

    expect(popUpContents[5]).toContain('Duty payable');
    // expect(popUpContents[5]).toBeGreaterThan(0);
});

Then('I close the popup', async ({ page }) => {
    await calculatorPage.closeCalculatePopUp();
})
