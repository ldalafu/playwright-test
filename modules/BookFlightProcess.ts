import { Page} from "@playwright/test";
import { SearchFlightPage } from "../pages/SearchFlightPage";
import { SelectFlightPage } from "../pages/SelectFlightPage";
import { SeatSelectionPage } from "../pages/SeatSelectionPage";

export class BookFlightProcess {
    private page: Page
    private readonly searchFlightPage: SearchFlightPage
    private readonly selectFlightPage: SelectFlightPage
    private seatSelectionPage: SeatSelectionPage

    constructor (page: Page) {
        this.page = page
        this.searchFlightPage = new SearchFlightPage(page)
        this.selectFlightPage = new SelectFlightPage(page)
        this.seatSelectionPage = new SeatSelectionPage(page)
    }

    async searchFlight(origin:string, destination:string, sDate: string, eDate: string){
        await this.searchFlightPage.inputCities(origin, destination)
        await this.searchFlightPage.inputDates(sDate,eDate)
        await this.searchFlightPage.clickSearch()
    }

    async continueToSeatSelection(){
        await this.selectFlightPage.clickContinue()
        await this.selectFlightPage.verifyOnExtrasTab()
        await this.selectFlightPage.clickContinue()
        await this.selectFlightPage.verifyOnSelectSeats()
    }

    async selectAvailableSeats(){
        await this.seatSelectionPage.selectRandomSeat()
        await this.seatSelectionPage.clickNext()
        await this.seatSelectionPage.selectRandomSeat()
        await this.seatSelectionPage.clickContinue()
    }

    async verifyFlightDetails(origin:string, destination:string, sDate: string, eDate:string){
        await this.selectFlightPage.verifyDetailsInHeader(origin, destination, sDate, eDate)
        await this.selectFlightPage.verifySelectedDates(sDate, eDate)
        await this.selectFlightPage.verifyFlightLocation(origin, destination)
    }
}