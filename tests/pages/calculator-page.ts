import { type Locator, type Page, type Dialog } from '@playwright/test'

export class CalculatorPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly yesOption: Locator;
    readonly purchasePriceValue: Locator;
    readonly calculateBtn: Locator;
    readonly calcPopUp: Locator;
    readonly calcPopUpTitle: Locator;
    readonly calcPopUpContents: Locator;
    readonly calcPopUpFooter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.locator('h1#skip');
        this.yesOption = page.locator('label[for="passenger_Y"]');
        this.purchasePriceValue = page.locator('#purchasePrice');
        
        this.calculateBtn = page.getByRole('button', { name: 'Calculate' });
        this.calcPopUp = page.locator('.modal-dialog .modal-body');
        // this.calcPopUp = page.locator('h2').getByText('Motor vehicle registration');
        // this.calcPopUp = page.getByRole('heading', {name: 'Motor vehicle registration' });
        this.calcPopUpTitle = page.locator('.modal-title');
        this.calcPopUpContents = page.locator('.modal-body table tr');
        this.calcPopUpFooter = page.locator('.modal-footer');
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

    async waitForCalculationPopUp() {
        await this.calcPopUp.waitFor({ state: 'visible', timeout: 90000 });
    }

    getCalculatePopUpTitleElement(): Locator {
        // return this.calcPopUpTitle;
        return this.calcPopUp;
    }

    async getCalculatePopUpTitle(): Promise<string> {
        return await this.calcPopUpTitle.innerText() || '';
    }

    async getCalculatePopUpContents(): Promise<string[]> {
        return await this.calcPopUpContents.allTextContents();
    }

    async closeCalculatePopUp() {
        await this.calcPopUpFooter.getByRole('button', { name: 'Close' }).click();
    }
}