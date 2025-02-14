const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async openBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: false }); // Cambia a true si no necesitas ver el navegador
    }
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    if (this.page) {
      await this.page.close(); // Cierra la pestaña activa
      this.page = null;
    }
    if (this.context) {
      await this.context.close(); // Cierra el contexto
      this.context = null;
    }
  }

  async shutdownBrowser() {
    if (this.browser) {
      await this.browser.close(); // Cierra el navegador por completo
      this.browser = null;
    }
  }
}

setWorldConstructor(CustomWorld);

// ✅ Asegura que se cierra el navegador al finalizar cada test
Before(async function () {
    await this.openBrowser();
});

After(async function () {
    await this.closeBrowser();
});

// ✅ Asegura que el navegador se cierra completamente al final de todas las pruebas
After(async function () {
    await this.shutdownBrowser();
});


