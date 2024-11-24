import { test as setup } from '@playwright/test';
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

setup('authentication', async({page, request}) => {
    // await page.goto('https://conduit.bondaracademy.com/', {waitUntil: 'networkidle'});
    // await page.getByRole('link', { name: 'Sign in' }).click()
    // await page.getByPlaceholder('Email').fill('kmazitest@test.com')
    // await page.getByPlaceholder('Password').fill('Password123')
    // await page.getByRole('button').click()

    // //to check our app has fully loaded
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // await page.context().storageState({path: authFile})

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { 
            "user":{"email":"kmazitest@test.com", "password":"Password123"}
            }
    })

    const responseBody = await response.json()
    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))
    

})
