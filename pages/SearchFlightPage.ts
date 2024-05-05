import { Locator, Page, expect} from "@playwright/test";
import dayjs from 'dayjs';

export class SearchFlightPage {
    readonly txtFldOrgin: Locator
    readonly txtFldDestination: Locator
    readonly txtFldStartDate: Locator
    readonly inputStartDate: Locator
    readonly txtFldEndDate: Locator
    readonly inputEndDate: Locator
    readonly btnSearch: Locator
    readonly page: Page
    readonly lblSearchForFlight: Locator

    constructor (page: Page) {
        this.page = page
        this.txtFldOrgin = page.getByLabel('From airport or city')
        this.txtFldDestination = page.getByLabel('To airport or city')
        this.txtFldStartDate = page.getByLabel('Leave on date, in day day')
        this.txtFldEndDate = page.getByLabel('Return on date, in day day')
        this.btnSearch = page.getByRole('button', { name: 'Search' })
        this.lblSearchForFlight = page.getByRole('heading', { name: 'Search for flights' })
        this.inputStartDate = page.locator('id=leaveDate')
        this.inputEndDate = page.locator('id=returnDate')

    }

    /**
     * 
     * @param origin - partial or exact
     * @param destination - partial or exact
     * selects the first item or closest to the keyword
     */
    async inputCities(origin: string, destination: string) {
        await this.lblSearchForFlight.waitFor({state: 'attached'})

        await this.txtFldOrgin.fill(origin)
        let item1 = this.page.getByRole('option', { name: origin }).first()
        let expOrigin = await item1.textContent()
        await item1.click()
        await expect(this.txtFldOrgin).toHaveValue(`${expOrigin}`)

        await this.txtFldDestination.fill(destination)
        let item2 = this.page.getByRole('option', { name: destination }).first()
        let expDestination = await item2.textContent()
        await item2.click()
        await expect(this.txtFldDestination).toHaveValue(`${expDestination}`)
    }

    /**
     * 
     * @param startDate - date format 'dd/mm'
     * @param endDate - date format 'dd/mm'
     */
    async inputDates(startDate: string, endDate: string){
        await this.txtFldStartDate.fill(dayjs(startDate).format("DD/MM"))
        await this.txtFldStartDate.press("Enter")
        await expect(this.inputStartDate).toHaveValue(dayjs(startDate).format("DD/MM"))

        await this.txtFldEndDate.fill(dayjs(endDate).format("DD/MM"))
        await this.txtFldEndDate.press("Enter")
        await expect(this.inputEndDate).toHaveValue(dayjs(endDate).format("DD/MM"))
    }

    async clickSearch(){
        await this.btnSearch.click()
    }
}