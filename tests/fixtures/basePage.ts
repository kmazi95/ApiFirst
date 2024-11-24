import {test as base} from "@playwright/test"
import ComputerPage from "../support/pageobjectmodel/pages/computers.page"
import AddComputerPage from "../support/pageobjectmodel/pages/addComputer.page"

export const test = base.extend<{computerPage: ComputerPage; addComputerPage: AddComputerPage}>

({
    //Define a fixture
    computerPage: async({page}, use) => {
        await use(new ComputerPage(page))
    },
    addComputerPage: async({page}, use) =>{
        await use(new AddComputerPage(page))
    }
})