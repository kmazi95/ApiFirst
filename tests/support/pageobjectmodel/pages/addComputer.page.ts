import {test, expect, Page} from "@playwright/test";
import ComputerDetails from "../sections/computerDetails.sections";
import ComputerDetailSubmission from "../sections/computerDetailSubmission.section";


export default class AddComputerPage{
    page : Page;
    computerDetailSubmission : ComputerDetailSubmission;
    computerDetails : ComputerDetails;    

    constructor(page: Page) {
        this.page = page;
        this.computerDetailSubmission = new ComputerDetailSubmission(this.page);
        this.computerDetails = new ComputerDetails(this.page);
    }

    public async goto()
    {
        await this.page.goto("https://computer-database.gatling.io/computers/new")
    }

    // Locators
    addComputerButton = () => this.page.getByText("Add a new computer");

    //Action
    public async clickAddNewComputer()
    {
        await this.addComputerButton().click();
    }

    public async addNewComputer() {
        await this.computerDetails.enterComputerDetails();
        await this.computerDetailSubmission.clickcreateNewComputer();


    }

}