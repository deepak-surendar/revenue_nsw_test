import { type Locator, type Page, type Dialog } from '@playwright/test'

export class CalculatorPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly yesOption: Locator;
    readonly purchasePriceValue: Locator;
    readonly calculateBtn: Locator;
    readonly calcPopUpHeading: Locator;
    readonly calcPopUpContents: Locator;
    readonly calcPopUpCloseBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.locator('h1#skip');
        this.yesOption = page.locator('label[for="passenger_Y"]');
        this.purchasePriceValue = page.locator('#purchasePrice');
        this.calculateBtn = page.getByRole('button', { name: 'Calculate' });

        this.calcPopUpHeading = page.getByRole('heading', { name: 'Motor vehicle registration', exact: true });
        this.calcPopUpContents = page.locator('table tr');
        this.calcPopUpCloseBtn = page.getByRole('button', { name: 'Close' }).last();
    }

    async getPageHeadingText() {
        const headingText = await this.pageHeading.textContent();
        return headingText;
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

    getCalculatePopUpHeading(): Locator {
        return this.calcPopUpHeading;
    }

    async getCalculatePopUpContents(): Promise<string[]> {
        const tableContent = await this.calcPopUpContents.allTextContents();
        return tableContent;
    }

    async closeCalculatePopUp() {
        await this.calcPopUpCloseBtn.click();
    }
}