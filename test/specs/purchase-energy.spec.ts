import { EnsekApiTestAppActions } from "test/methods/ensek-api-test-app.actions"

describe('purchase energy tests', () => {

    beforeAll(async () => {
        EnsekApiTestAppActions.checkEnergyUnits();
        //this first one is to ensure the data is in the default state before running the tests

    })

    describe('when the user purchases 500 units of electricity', () => {

        beforeAll(async () => {
            EnsekApiTestAppActions.buyEnergy(3, 500);
        })

        it('reduces the available electric by 500 units', async () => {
            EnsekApiTestAppActions.checkEnergyUnits(3822, undefined, undefined, undefined);
        })

        it('registers a new order has been created', async () => {
            EnsekApiTestAppActions.checkOrders('Elec', 500);
        })
    })

    afterAll(async () => {
        EnsekApiTestAppActions.resetEnergyDataToDefault();
    })
})