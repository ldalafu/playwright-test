import { test } from "../test-options"
import { BookFlightProcess } from "../modules/BookFlightProcess";

test.describe('Seat Selection', () => {
  // Test Case 6: Verify that the user can select seats for the booked flight, if seat selection is available.
  test('verify that the user can enter the passenger details', async ({ pageManager, page}) => {
    let process = new BookFlightProcess(page)
    await process.searchFlight('Auckland', 'Queenstown', '09/22/2024', '10/24/2024')
    await pageManager.onSelectFlightPage().selectFlights(2,3, true)
    await pageManager.onSelectFlightPage().clickContinue()
    await pageManager.onSelectFlightPage().verifyOnEnterPassDetailsTab()

    await pageManager.onEnterPassDetailsPage().inputPersonalDetails('Ms', 'John', 'Boy')
    await pageManager.onEnterPassDetailsPage().inputContactDetails(123456789, 'johnboy@gmail.com')
    await pageManager.onEnterPassDetailsPage().uncheckAllowOffer()
    await process.continueToSeatSelection()

    
    //test
    await pageManager.onSeatSelectionPage().verifyAvailableSeats()
    await process.selectAvailableSeats()
    await pageManager.onSelectFlightPage().verifyOnReviewAndPay()
  });

//   Test Case 7: Verify that the user cannot select seats for the booked flight if seat selection is not available
  test('verify that the user cannot select seats if not available', async ({ pageManager, page}) => {
    let process = new BookFlightProcess(page)
    await process.searchFlight('Auckland', 'Hong Kong', '05/10/2024', '05/20/2024')
    await pageManager.onSelectFlightPage().selectFlights(2,3)
    await pageManager.onSelectFlightPage().clickContinue()
    await pageManager.onSelectFlightPage().verifyOnEnterPassDetailsTab()

    await pageManager.onEnterPassDetailsPage().inputPersonalDetails('Ms', 'John', 'Boy')
    await pageManager.onEnterPassDetailsPage().inputContactDetails(123456789, 'johnboy@gmail.com')
    await pageManager.onEnterPassDetailsPage().uncheckAllowOffer()
    await process.continueToSeatSelection()

    
    //test
    if(await pageManager.onSeatSelectionPage().isSeatSelectionAvailable()){
        await pageManager.onSeatSelectionPage().verifyNoAvailableSeats()
    }
  });
})

