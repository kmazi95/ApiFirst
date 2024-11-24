import {test, expect, Page} from "@playwright/test";


export default class ComputerDetails{
    page:Page;

    constructor(page: Page){
        this.page = page;
    }


//locators
nameTextbox = () => this.page.locator('#name')
introducedTextbox = () => this.page.locator('#introduced')
discontinuedTextbox = () => this.page.locator('#discontinued')
companyTextbox = () => this.page.locator('#company')



//action

public async enterComputerDetails(){
    await this.nameTextbox().fill("the lappy")
    await this.introducedTextbox().fill("1995-09-02")
    await this.discontinuedTextbox().fill("1998-09-02")
    await this.companyTextbox().selectOption({value: "1"})
}

}