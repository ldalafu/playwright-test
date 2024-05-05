import { Locator, Page, expect} from "@playwright/test";
import dayjs from 'dayjs';

export class SearchFlightPage {
    private readonly page: Page
    private readonly txtFldOrgin: Locator
    private readonly txtFldDestination: Locator
    private readonly inputStartDate: Locator
    private readonly inputEndDate: Locator
    private readonly btnSearch: Locator
    private readonly lblSearchForFlight: Locator
    private readonly datePicker: Locator

    constructor (page: Page) {
        this.page = page
        this.txtFldOrgin = page.getByLabel('From airport or city')
        this.txtFldDestination = page.getByLabel('To airport or city')
        this.btnSearch = page.getByRole('button', { name: 'Search' })
        this.lblSearchForFlight = page.getByRole('heading', { name: 'Search for flights' })
        this.inputStartDate = page.locator('id=leaveDate')
        this.inputEndDate = page.locator('id=returnDate')
        this.datePicker = page.locator('#calendarpanel-2')
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
        let endDD = dayjs(endDate).format("DD");
        endDD = (endDD.substring(0,1) === '0') ? endDD.substring(1) : endDD ;

        await this.inputStartDate.fill(dayjs(startDate).format("DD/MM"))
        await this.inputStartDate.press("Enter")

        await this.inputEndDate.fill(dayjs(endDate).format("DD/MM"))
        await this.datePicker.waitFor({state:"visible"})
        await this.datePicker.getByText(endDD, { exact: true }).first().click()

        await this.lblSearchForFlight.click()
        await this.datePicker.waitFor({state:'hidden'})
    }

    async clickSearch(){
        await this.btnSearch.click()
        await this.btnSearch.waitFor({state: "hidden"})
    }
}