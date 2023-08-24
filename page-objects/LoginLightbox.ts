import { Page, Locator } from '@playwright/test';

export class LoginLightbox {
  readonly page: Page;
  readonly aceptarButton: Locator;
  readonly accederButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorText: Locator;

  static readonly ERROR_MESSAGE = 'ERROR DE INICIO DE SESIÓN';

  constructor(page : Page) {
    this.page = page;
    this.aceptarButton = page.getByRole('button', { name: 'ACEPTAR' });
    this.accederButton = page.getByRole('button', { name: 'Acceder' });
    this.usernameInput = page.getByRole('textbox', { name: 'Usuario / Correo electrónico' });
    this.passwordInput = page.getByLabel('Contraseña');
    this.loginButton = page.locator("#btnaccess");
    this.errorText = page.getByRole('heading', { name: 'Error de inicio de sesión' });
  }

  async login(username: string, password: string) {
    try {
      await this.aceptarButton.click();
    } catch (error) {
      console.log("The ACEPTAR button is not present");
    }
    await this.accederButton.click();
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorText(): Promise<string> {
    return await this.errorText.innerText();
  }
}
