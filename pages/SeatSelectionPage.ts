import { Locator, Page, expect} from "@playwright/test";
import dayjs from 'dayjs';

export class SeatSelectionPage {
    private page: Page
    private btnAvailableSeat: Locator
    private btnNext: Locator
    private lblSeatNumber: Locator
    private btnContinue: Locator
    private txtNoSeatSelection: Locator

    constructor (page: Page) {
        this.page = page
        this.btnAvailableSeat = this.page.getByRole('button').filter({hasText:' Available Standard'})
        this.btnNext= this.page.getByLabel('Seat information').getByRole('button', { name: 'Next flight' })
        this.lblSeatNumber = this.page.getByRole('option', { name: 'Standard economy' }).locator('.vui-ss-seat-number')
        this.btnContinue = this.page.getByLabel('Flight 2').getByRole('button', { name: 'Continue' })
        this.txtNoSeatSelection = this.page.getByText('You can\'t select your exact')
    }

    async selectRandomSeat(){
        // select seat 
        await this.btnAvailableSeat.first().waitFor({state:"visible"})
        let count = await this.btnAvailableSeat.count()
        let random = Math.floor(Math.random() * count)
        await this.btnAvailableSeat.nth(random).click()
        
        // get seat
       return await this.lblSeatNumber.textContent()
    }

    async clickNext(){
        await this.btnNext.waitFor({state:"visible"})
        await this.btnNext.click()
    }

    async clickContinue(){
        await this.btnContinue.waitFor({state:"visible"})
        await this.btnContinue.click()
    }

    async verifyAvailableSeats(){
        await expect(this.btnAvailableSeat.first()).toBeVisible()
    }

    async isSeatSelectionAvailable(){
        return await this.txtNoSeatSelection.isVisible()
    }

    async verifyNoAvailableSeats(){
        await expect(this.btnAvailableSeat.first()).toBeHidden()
    }
}