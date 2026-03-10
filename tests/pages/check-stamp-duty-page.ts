import { expect, type Locator, type Page } from '@playwright/test'

export class CheckStampDutyPage {
    readonly page: Page;
    readonly checkOnlineButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkOnlineButton = page.getByRole('button', { name: 'Check online. External website' })
    }

    async goto() {
        await this.page.goto('');
    }

    async checkStampDutyOnline() {
        await this.checkOnlineButton.click();
    }
}