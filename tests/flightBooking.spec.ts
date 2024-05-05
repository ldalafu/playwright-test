import { test } from "../test-options"
import { BookFlightProcess } from "../modules/BookFlightProcess";

test.describe('Flight Selection and Booking', () => {
  //  Test Case 3: Verify that the user can select a flight from the search results
  test('verify that the user can select flight from search results', async ({ pageManager, page}) => {
    let process = new BookFlightProcess(page)
    await process.searchFlight('Auckland', 'Hong Kong', '09/22/2024', '10/24/2024')
    await pageManager.onSelectFlightPage().selectFlights(2,3)

    // test
    await pageManager.onSelectFlightPage().verifySelectedFlights(2,3)

  });

  // Test Case 4: Verify that the user can proceed to booking after selecting a flight
  test('verify that the user can proceed to booking', async ({ pageManager, page}) => {
    let process = new BookFlightProcess(page)
    await process.searchFlight('Auckland', 'Queenstown', '09/22/2024', '10/24/2024')
    await pageManager.onSelectFlightPage().selectFlights(2,3, true)
    await pageManager.onSelectFlightPage().clickContinue()

    //test
    await pageManager.onSelectFlightPage().verifyOnEnterPassDetailsTab()
  });

  // Test Case 5: Verify that the user can enter the passenger details
  test('verify that the user can enter the passenger details', async ({ pageManager, page}) => {
    let process = new BookFlightProcess(page)
    await process.searchFlight('Auckland', 'Queenstown', '09/22/2024', '10/24/2024')
    await pageManager.onSelectFlightPage().selectFlights(2,3, true)
    await pageManager.onSelectFlightPage().clickContinue()
    await pageManager.onSelectFlightPage().verifyOnEnterPassDetailsTab()

    // input details
    await pageManager.onEnterPassDetailsPage().inputPersonalDetails('Ms', 'John', 'Boy')
    await pageManager.onEnterPassDetailsPage().inputContactDetails(123456789, 'johnboy@gmail.com')
    await pageManager.onEnterPassDetailsPage().uncheckAllowOffer()
    await pageManager.onSelectFlightPage().clickContinue()

    //test
    await pageManager.onSelectFlightPage().verifyNameInHeader('John Boy')
    await pageManager.onSelectFlightPage().verifyOnExtrasTab()

  });
})

