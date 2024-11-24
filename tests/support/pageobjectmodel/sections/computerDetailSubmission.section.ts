import {test, expect, Page} from "@playwright/test";



export default class computerDetailSubmission{
    page:Page;

    constructor(page: Page){
        this.page = page;
    }


//locators
SubmitButton = () => this.page.getByText("Create this computer")

//actions
public async clickcreateNewComputer(){
    await this.SubmitButton().click()
}
}
//await page.getByText("Create this computer").click()
