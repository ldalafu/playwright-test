import { test as base } from "@playwright/test"
import { PageManager } from "./modules/PageManager"

export type TestOptions = {
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    pageManager: async ({ page }, use) => {
        const pm = new PageManager(page)
        await page.goto(process.env.URL)
        await use(pm)
    }
})