import { type Locator, type Page, type Dialog } from '@playwright/test'

export class CalculatorPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly yesOption: Locator;
    readonly purchasePriceValue: Locator;
    readonly calculateBtn: Locator;
    readonly calcPopUp: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.locator('h1#skip');
        this.yesOption = page.locator('label[for="passenger_Y"]');
        this.purchasePriceValue = page.locator('#purchasePrice');
        
        this.calculateBtn = page.getByRole('button', { name: 'Calculate' });
        this.calcPopUp = page.locator('.modal-dialog');
    }

    async getPageHeadingText() {
        const headingText = await this.pageHeading.textContent();
        return headingText;
    }

    getPageUrl(): string {
        return this.page.url();
    }

    async selectYesOption() {
        await this.yesOption.click();
    }

    async fillPurchaseValue(price: string) {
        await this.purchasePriceValue.fill(price);
    }

    async clickCalculateBtn() {
        await this.calculateBtn.click();
    }

    async waitForCalculationPopUp() {
        await this.calcPopUp.waitFor({ state: 'visible' });
    }

    async getCalculatePopUpModalHeader(): Promise<string> {
        return await this.page.locator('h4.modal-title').textContent() || '';
    }

    async getCalculatePopUpContents(): Promise<string[]> {
        return await this.page.locator('.modal-body table tr').allTextContents();
    }

    async closeCalculatePopUp() {
        await this.page.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    }
}