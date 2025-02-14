const fs = require('fs');
const path = require('path');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');  // 📌 Asegúrate de importar `expect` desde Playwright

Before(async function () {
    await this.openBrowser();
});

After(async function () {
    await this.closeBrowser();
});

Given('el usuario está en la página de login', async function () {
    await this.page.goto('https://www.demoblaze.com/');
    await this.page.waitForLoadState('networkidle');
    await this.page.click('#login2');  
    await this.page.waitForSelector('#loginusername');
});

When('ingresa sus credenciales', async function () {
    // 📌 Carga el usuario desde el archivo JSON
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, '../user.json')));
    
    await this.page.fill('#loginusername', userData.username);
    await this.page.fill('#loginpassword', userData.password);
    await this.page.click('button[onclick="logIn()"]');  

    await this.page.waitForTimeout(3000);
});

Then('el sistema muestra el dashboard', async function () {
    // 📌 Espera a que aparezca el nombre del usuario en la barra superior
    await this.page.waitForSelector('#nameofuser', { timeout: 5000 });

    const isLoggedIn = await this.page.locator('#nameofuser').isVisible();
    expect(isLoggedIn).toBeTruthy(); // 📌 Se usa `expect` correctamente
});






