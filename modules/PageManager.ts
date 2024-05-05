import { Page } from "@playwright/test"
import { SearchFlightPage } from "../pages/SearchFlightPage"
import { SelectFlightPage } from "../pages/SelectFlightPage"
import { EnterPassDetailsPage } from "../pages/EnterPassDetailsPage"
import { SeatSelectionPage } from "../pages/SeatSelectionPage"

export class PageManager {
    private readonly page: Page
    private readonly searchFlightPage: SearchFlightPage
    private readonly selectFlightPage: SelectFlightPage
    private readonly enterPassDetails: EnterPassDetailsPage
    private readonly seatSelectionPage: SeatSelectionPage

    constructor(page: Page) {
        this.page = page
        this.searchFlightPage = new SearchFlightPage(page)
        this.selectFlightPage = new SelectFlightPage(page)
        this.enterPassDetails = new EnterPassDetailsPage(page)
        this.seatSelectionPage = new SeatSelectionPage(page)
    }

    onSearchFlightPage(){
        return this.searchFlightPage
    }

    onSelectFlightPage(){
        return this.selectFlightPage
    }

    onEnterPassDetailsPage(){
        return this.enterPassDetails
    }

    onSeatSelectionPage(){
        return this.seatSelectionPage
    }

}