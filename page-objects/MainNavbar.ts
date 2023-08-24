import { Page, Locator } from '@playwright/test';

export class MainNavbar {
  readonly page: Page;
  readonly accountName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountName = page.locator(".loginOps>div:first-child span");
  }

  async getAccountName(): Promise<string> {
    await this.accountName.waitFor();
    return await this.accountName.innerText();
  }
}
