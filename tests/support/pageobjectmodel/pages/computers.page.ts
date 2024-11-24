import {test, expect, Page} from "@playwright/test";

export default class ComputerPage{
    page : Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto()
    {
        await this.page.goto("https://computer-database.gatling.io/computers")
    }

    // Locators
    addNewComputerButton = () => this.page.getByText("Add a new computer");
    computerAddedverificationLabel = () => this.page.getByText("Done ! Computer the lappy has been created")


    //await expect(
    //    page.getByText("Done ! Computer the lappy has been created")
    //   ).toBeVisible()

    //Action
    public async clickAddNewComputer()
    {
        await this.addNewComputerButton().click();
    }

    public async AssertComputerAddedSuccesMsg(){
        await this.computerAddedverificationLabel().isVisible()
    }

}