import { test } from "../test-options"
import { BookFlightProcess } from "../modules/BookFlightProcess";

test.describe('Flight Search Functionality', () => {
  //  Test Case 1: Verify that the user can search for flights by providing valid origin and destination cities, along with a valid departure date
  test('verify that the user can search for flights', async ({ pageManager, page}) => {
    let process = new BookFlightProcess(page)
    await process.searchFlight('Auckland', 'Hong Kong', '09/22/2024', '10/24/2024')

    //test
    await pageManager.onSelectFlightPage().verifyOnSelectFlightTab()
  });

  // Test Case 2: Verify that the search results display relevant flights based on the user's input
  test('verify that the search results are correct', async ({ pageManager, page }) => {
    const origin:string = 'Wellington'
    const destination:string = 'Hong Kong'
    const leaveDate:string = '07/01/2024'
    const returnDate:string = '07/08/2024'

    let process = new BookFlightProcess(page)
    await process.searchFlight(origin, destination, leaveDate, returnDate)
    
    //test
    await process.verifyFlightDetails(origin, destination, leaveDate, returnDate)

  })
})

