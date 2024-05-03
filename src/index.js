const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('chai').assert;
//*[@id="__next"]/div/header/div/div[2]/div[1]/div/div[1]/div
async function viewBusSchedule() {
	// Создать экземпляр драйвера
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		// Открыть сайт
		await driver.get('https://atlasbus.by/');

		// Ввести пункт отправления и пункт назначения
		const fromInput = await driver.wait(
			until.elementLocated(By.xpath('//input[@data-testid="from-suggest"]')),
			2000
		);
		await fromInput.sendKeys('Минск');
		await fromInput.sendKeys(Key.ENTER);

		const toInput = await driver.wait(
			until.elementLocated(By.xpath('//input[@data-testid="to-suggest"]')),
			2000
		);
		await toInput.sendKeys('Москва');
		await toInput.sendKeys(Key.ENTER);

		// Нажать кнопку "Найти"
		const searchButton = await driver.wait(
			until.elementLocated(
				By.xpath(
					'//*[@id="__next"]/div/header/div/div[2]/div[1]/div/div[2]/button'
				)
			),
			2000
		);
		await searchButton.click();
	} finally {
		// Закрыть драйвер
		await driver.quit();
	}
}

// Запуск теста
describe('View Bus Schedule Test', function () {
	it('Should display bus schedule for selected route and date', async () => {
		await viewBusSchedule();
	});
});
