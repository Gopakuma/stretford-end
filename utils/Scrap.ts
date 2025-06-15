import puppeteer from 'puppeteer';
import config from 'config';
const FREE_API_CONFIG: any = config.get('FreeAPI');

class Scrap {
    public static async startScrap() {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(FREE_API_CONFIG.matchdayURL);

            const matchData = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.SimpleMatchCard_simpleMatchCard__content__ZWt2p'))
                    .map(matchCard => {
                        const matchDay = matchCard.querySelector('.SimpleMatchCard_simpleMatchCard__preMatch__BtjKV time.title-8-bold')?.textContent?.trim() || 'No match day found';
                        const matchTime = matchCard.querySelector('.SimpleMatchCard_simpleMatchCard__infoMessage___NJqW.title-8-medium')?.textContent?.trim() || 'No match time found';
                        const teams = Array.from(matchCard.querySelectorAll('.SimpleMatchCardTeam_simpleMatchCardTeam__name__7Ud8D'))
                            .map(team => team.textContent?.trim() || 'No team found');

                        return { matchDay, matchTime, teams };
                    });
            });
            await browser.close();
            return matchData ? matchData : [];
        } catch (error) {
            console.log(error);
        }
    }
}

export default Scrap;