import { Locator, Page, expect} from "@playwright/test";
import dayjs from 'dayjs';

export class EnterPassDetailsPage {
    private page: Page
    private selectFldTitle: Locator
    private txtFldFirstName: Locator
    private txtFldFamilyName: Locator
    private txtFldNumber: Locator
    private txtFldEmailAdd: Locator
    private chkBoxAllowOffer: Locator

    constructor (page: Page) {
        this.page = page
        this.selectFldTitle = this.page.getByLabel('Title')
        this.txtFldFirstName = this.page.getByLabel('First name')
        this.txtFldFamilyName = this.page.getByLabel('Family name')
        this.txtFldNumber = this.page.getByLabel('Mobile or Landline')
        this.txtFldEmailAdd = this.page.getByLabel('Email address')
        this.chkBoxAllowOffer = this.page.getByLabel('Allow Air New Zealand to tell')

    }

    async inputPersonalDetails(title:string, fName:string, lName: string){
        await this.selectFldTitle.selectOption(title)
        await this.txtFldFirstName.fill(fName)
        await this.txtFldFamilyName.fill(lName)
    }

    async inputContactDetails(mobile:number, email:string){
        await this.txtFldNumber.fill(`${mobile}`)
        await this.txtFldEmailAdd.fill(email)
    }

    async uncheckAllowOffer(){
        if(await this.chkBoxAllowOffer.isChecked()){
            await this.chkBoxAllowOffer.uncheck()
        }
    }
}