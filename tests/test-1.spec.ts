import {test} from "./fixtures/basePage";
import { text } from "stream/consumers";
import ComputerPage from "./support/pageobjectmodel/pages/computers.page";
import AddComputerPage from "./support/pageobjectmodel/pages/addComputer.page";


test("Basic test POM", async ({computerPage,addComputerPage}) => {
// const computerPage = new ComputerPage(page)
// const addComputerPage = new AddComputerPage(page)

await computerPage.goto()
await computerPage.clickAddNewComputer()
await addComputerPage.addNewComputer()
await computerPage.AssertComputerAddedSuccesMsg()
})