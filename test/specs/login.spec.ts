import { EnsekApiTestAppActions } from "test/methods/ensek-api-test-app.actions";

describe('login tests', () => {
    
    describe('when the user logs in with valid test credentials', () => {

        it('successfully logs the user in', async () => {
            await EnsekApiTestAppActions.login('test','testing', 200);
        })
    })
    
    describe('when the user logs in with invalid credentials', () => {

        it('prevents the user from logging in', async () => {
            await EnsekApiTestAppActions.login('incorrect','credentials', 401);
        })
    })

    describe('when the user logs in with blank credentials', () => {

        it('prevents the user from logging in', async () => {
            await EnsekApiTestAppActions.login('','', 401);
        })
    })
})