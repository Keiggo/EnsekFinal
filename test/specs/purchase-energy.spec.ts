import { EnsekApiTestAppActions } from "test/methods/ensek-api-test-app.actions"

describe('purchase energy tests', () => {

    describe('when the user purchases 500 units of electricity', () => {

        beforeAll(async () => {
            await EnsekApiTestAppActions.buyEnergy(3, 500);
        })

        it('reduces the available electric by 500 units', async () => {
            await EnsekApiTestAppActions.checkEnergyUnits(3822, undefined, undefined, undefined);
        })

        it('registers a new order has been created', async () => {
            await EnsekApiTestAppActions.checkOrders('Elec', 500);
        })
    })

    afterAll(async () => {
        await EnsekApiTestAppActions.resetEnergyDataToDefault();
    })
})