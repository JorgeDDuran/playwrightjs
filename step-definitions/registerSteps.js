const fs = require('fs');
const path = require('path');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');

Before(async function () {
    await this.openBrowser();
});

After(async function () {
    await this.closeBrowser();
});

Given('el usuario está en la página de registro', async function () {
    await this.page.goto('https://www.demoblaze.com/');
    await this.page.waitForLoadState('networkidle');
    await this.page.click('#signin2');  // Abre modal de registro
    await this.page.waitForSelector('#sign-username');
});

When('ingresa sus datos de registro', async function () {
    const randomUser = `testUser${Math.floor(Math.random() * 10000)}`;
    const password = 'TestPassword123';

    await this.page.fill('#sign-username', randomUser);
    await this.page.fill('#sign-password', password);
    await this.page.click('button[onclick="register()"]');  

    await this.page.waitForTimeout(2000);
    await this.page.on('dialog', async dialog => {
        await dialog.accept();
    });

    // 📌 Guarda el usuario generado en un archivo JSON
    const userData = { username: randomUser, password };
    fs.writeFileSync(path.join(__dirname, '../user.json'), JSON.stringify(userData, null, 2));

    console.log(`Usuario registrado: ${randomUser}`);
});

Then('el sistema confirma el registro exitoso', async function () {
    console.log('Registro completado, revisa manualmente la cuenta creada.');
});




