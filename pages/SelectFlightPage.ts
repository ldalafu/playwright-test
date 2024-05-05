import { Locator, Page, expect} from "@playwright/test";
import exp from "constants";
import dayjs from 'dayjs';

export class SelectFlightPage {
    private page: Page
    private readonly lblFlight1: Locator
    private readonly lblFlight2: Locator
    private readonly radioFlight1Domestic: Locator
    private readonly radioFlight1Intl: Locator
    private readonly radioFlight2Domestic: Locator
    private readonly radioFlight2Intl: Locator
    private readonly btnContinue: Locator
    private readonly tabSelectFlight: Locator
    private readonly tabEnterPassDetails: Locator
    private readonly tabExtras: Locator
    private readonly tabSelectSeats: Locator
    private readonly tabReviewAndPay: Locator

    constructor (page: Page) {
        this.page = page
        this.lblFlight1 = this.page.locator('h2').filter({ hasText: 'Flight 1 Select your flight' })
        this.lblFlight2 = this.page.locator('h2').filter({ hasText: 'Flight 2 Select your return' })
        this.radioFlight1Domestic = this.page.getByLabel('Seat, $').and(page.locator("[name = 'legOptionCost1']"))
        this.radioFlight1Intl = this.page.getByLabel('Economy, $').and(page.locator("[name = 'legOptionCost1']"))
        this.radioFlight2Domestic = this.page.getByLabel('Seat, $').and(page.locator("[name = 'legOptionCost2']"))
        this.radioFlight2Intl = this.page.getByLabel('Economy, $').and(page.locator("[name = 'legOptionCost2']"))
        this.btnContinue = this.page.getByRole('button', { name: 'Continue' })
        this.tabSelectFlight = this.page.locator(".is-current").getByText('Select your flights');
        this.tabEnterPassDetails = this.page.locator(".is-current").getByText('Enter passenger details');
        this.tabExtras = this.page.locator(".is-current").getByText('Extras');
        this.tabSelectSeats = this.page.locator(".is-current").getByText('Select your seats');
        this.tabReviewAndPay = this.page.locator(".is-current").getByText('Review and pay');
    }

    async verifyOnSelectFlightTab(){
        await expect(this.tabSelectFlight).toBeVisible()
    }

    async verifyOnEnterPassDetailsTab(){
        await expect(this.tabEnterPassDetails).toBeVisible()
    }

    async verifyOnExtrasTab(){
        await expect(this.tabExtras).toBeVisible()
    }

    async verifyOnSelectSeats(){
        await expect(this.tabSelectSeats).toBeVisible()
    }

    async verifyOnReviewAndPay(){
        await expect(this.tabReviewAndPay).toBeVisible()
    }
    /**
     * 
     * @param origin 
     * @param destination 
     * @param startDate - MM/DD/YYYY
     * @param endDate - MM/DD/YYYY
     * verify flight details in header
     */
    async verifyDetailsInHeader(origin:string, destination:string, startDate: string, endDate:string){
        await expect(this.page.getByText(`${origin} to ${destination}`)).toBeVisible();
        await expect(this.page.getByText(`${destination} to ${origin}`)).toBeVisible();

        await expect(this.page.getByText(dayjs(startDate).format("dddd DD MMMM YYYY")).first()).toBeAttached()
        await expect(this.page.getByText(dayjs(endDate).format("dddd DD MMMM YYYY")).first()).toBeAttached()

    }

    /**
     * 
     * @param startDate - MM/DD/YYYY
     * @param endDate - MM/DD/YYYY
     */
    async verifySelectedDates(startDate:string, endDate:string){
        let startDateEl = this.page.getByRole('gridcell', { name: `display fares for ${dayjs(startDate).format("dddd DD")}` });
        await startDateEl.waitFor({ state: "visible" })
        await expect(startDateEl).toHaveAttribute("aria-selected","true")

        let endDateEl = this.page.getByRole('gridcell', { name: `display fares for ${dayjs(endDate).format("dddd DD")}` });
        await endDateEl.waitFor({ state: "visible" })
        await expect(endDateEl).toHaveAttribute("aria-selected","true")
    }

    async verifyFlightLocation(origin:string, destination:string){
        expect(await this.lblFlight1 .textContent()).toMatch(`${destination}`)

        expect(await this.lblFlight2.textContent()).toMatch(`${origin}`)
    }
    
    /**
     * 
     * @param flight1 - 0 index
     * @param flight2 - 0 index
     */
    async selectFlights(flight1:number, flight2:number, isDomestic:boolean = false){
        if(isDomestic){
            await this.radioFlight1Domestic.nth(flight1).click()
            await this.radioFlight2Domestic.nth(flight2).click()
        }
        else{
            await this.radioFlight1Intl.nth(flight1).click()
            await this.radioFlight2Intl.nth(flight2).click()

        }
    }

    async clickContinue(){
        await this.btnContinue.click();
    }

    async verifySelectedFlights(flight1:number, flight2:number, isDomestic:boolean = false){
        if(isDomestic){
            await expect(this.radioFlight1Domestic.nth(flight1)).toBeChecked()
            await expect(this.radioFlight2Domestic.nth(flight2)).toBeChecked()
        }
        else{
            await expect(this.radioFlight1Intl.nth(flight1)).toBeChecked()
            await expect(this.radioFlight2Intl.nth(flight2)).toBeChecked()

        }
    }

    async verifyNameInHeader(name: string){
        await expect(this.page.getByLabel('flight').getByText(name)).toBeVisible()
    }
}