import {test, expect} from "@playwright/test";
import tags from "../test-data/tags.json"

test.beforeEach(async ({page}) => {
await page.route("*/**/api/tags", async route => {
    await route.fulfill({
        body: JSON.stringify(tags)
    })
})

await page.goto('https://conduit.bondaracademy.com/', {waitUntil: 'networkidle'});


 })

test("API Test", async ({request, page}) => {
    await page.route('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = "this is a test title MOCK"
        responseBody.articles[0].description = 'this is a tes des MOCK'

        await route.fulfill({
            body: JSON.stringify(responseBody)

        })
        })
        
await page.getByText('Global Feed').click()        
await expect(page.locator('.navbar-brand')).toHaveText('conduit');
await expect (page.locator('app-article-list h1').first()).toContainText("this is a test title MOCK")
await expect (page.locator('app-article-list p').first()).toContainText("this is a tes des MOCK")

});
test("Delete Article", async({page,request}) => { 

   const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { 
            "user":{"email":"kmazitest@test.com", "password":"Password123"}
            }
    })

    const responseBody = await response.json()
    const accesstoken = responseBody.user.token

   const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data:{
            article: {title: "test 3", description: "testing 3", body: "tester test etst ets ", tagList: []}
        },
        headers: {
            Authorization: `Token ${accesstoken}`
        }

    })
    expect(articleResponse.status()).toEqual(201)
    await page.getByText('global Feed').click()
    await page.getByText('test 3').click()
    await page.getByRole('button', {name: "Delete Article"}).first().click()
    await page.getByText('global Feed').click()

    await expect (page.locator('app-article-list h1').first()).not.toContainText("testing 3")



})

test("Delete create Article", async({page,request}) => { 
    await page.getByText('New Article').click()
    await page.getByRole('textbox', {name: 'Article Title'}).fill('Playwright is so awsome')
    await page.getByRole('textbox', {name: 'What\'s this article about?'}).fill('About Playwright is awsome')
    await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('we like to use Playwright because it is awsome')
    await page.getByRole('button',{name: 'Publish Article'}).click()
    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/Playwright-is-so-awsome-13106')
    const articleResponseBody = await articleResponse.json()
    const slugID = articleResponseBody.article.slug

    await expect(page.locator('.article-page h1')).toContainText('Playwright is so awsome')
    await page.getByText('Home').click()
    await page.getByText('global Feed').click()


    await expect (page.locator('app-article-list h1').first()).toContainText("Playwright is so awsome")

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { 
            "user":{"email":"kmazitest@test.com", "password":"Password123"}
            }
    })

    const responseBody = await response.json()
    const accesstoken = responseBody.user.token

    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugID}`, {
        headers: {
            Authorization: `Token ${accesstoken}`
        }
    })

    expect(deleteArticleResponse.status()).toEqual(204)
    
    //await page.getByText('Home').click()
    await page.getByText('global Feed').click()
    await expect (page.locator('app-article-list h1').first()).not.toContainText("Playwright is so awsome")








})



