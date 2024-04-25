const express = require('express');
const { Builder, By, until } = require('selenium-webdriver');

const app = express();

// Rota para realizar o web scraping da home do site bianca.com
app.get('/scrape', async (req, res) => {
  try {
    // Inicializa o driver do Selenium
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://bianca.com');

    await driver.wait(until.elementLocated(By.css('body')), 5000);

    const conteudo = await driver.findElement(By.css('body')).getText();

    // Fecha o navegador
    await driver.quit();

    res.json({ conteudo });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar o web scraping.' + error});
  }
});

app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});


// rota para acessar a api: http://localhost:3000/scrape