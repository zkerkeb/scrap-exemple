const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const cron = require('node-cron');

// Créez une tâche cron pour exécuter le script chaque semaine (par exemple, tous les dimanches à 9 heures du matin)
cron.schedule('0 9 * * SUN', async () => {
    // Lancez un nouveau navigateur avec puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Accédez à la page Web
    await page.goto('https://onepiecescan.fr/');

    // Obtenez le contenu HTML de la page
    const content = await page.content();

    // Chargez le contenu dans Cheerio
    const $ = cheerio.load(content);

    // Utilisez Cheerio pour sélectionner le dernier lien dans la liste
    const lastLink = $('#All_chapters .ceo_latest_comics_widget ul li a').first().attr('href');

    console.log('Dernier lien:', lastLink);

    await browser.close();
});