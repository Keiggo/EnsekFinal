import { EnergyType } from 'test/enums/energy-type.enums';
import { EnsekApiTestAppActions } from 'test/methods/ensek-api-test-app.actions';

describe('purchase energy tests', () => {
    let buyAmount = 500;

    describe('when the user purchases 500 units of electricity', () => {
        let startingElectricityAmount: number;

        beforeAll(async () => {
            await EnsekApiTestAppActions.resetEnergyDataToDefault();
            //This will currently fail as the reset call doesn't work

            startingElectricityAmount = await EnsekApiTestAppActions.getSingleCurrentEnergyUnitAmount('electric');
            await EnsekApiTestAppActions.buyEnergy(EnergyType.Electric, buyAmount);
        });

        it('reduces the available electric by 500 units', async () => {
            await EnsekApiTestAppActions.checkEnergyUnits('electric', startingElectricityAmount, buyAmount);
        });

        it('registers a new order has been created', async () => {
            await EnsekApiTestAppActions.checkOrders('Elec', buyAmount);
        });
    });

    describe('when the user purchases 500 units of gas', () => {
        let startingGasAmount: number;

        beforeAll(async () => {
            startingGasAmount = await EnsekApiTestAppActions.getSingleCurrentEnergyUnitAmount('gas');
            await EnsekApiTestAppActions.buyEnergy(EnergyType.Gas, buyAmount);
        });

        it('reduces the available gas by 500 units', async () => {
            await EnsekApiTestAppActions.checkEnergyUnits('gas', startingGasAmount, buyAmount);
        });

        it('registers a new order has been created', async () => {
            await EnsekApiTestAppActions.checkOrders('gas', buyAmount);
        });
    });

    describe('when the user purchases 500 units of nuclear', () => {
       
        beforeAll(async () => {
            await EnsekApiTestAppActions.buyEnergy(EnergyType.Nuclear, buyAmount);
        });

        it('returns a message informing that there is no nuclear to purchase', async () => {
            await EnsekApiTestAppActions.checkNoEnergyMessage(2, 'nuclear');
        });
    });

    describe('when the user purchases 500 units of oil', () => {
        let startingOilAmount: number;

        beforeAll(async () => {
            startingOilAmount = await EnsekApiTestAppActions.getSingleCurrentEnergyUnitAmount('oil');
            await EnsekApiTestAppActions.buyEnergy(EnergyType.Oil, buyAmount);
        });

        it('reduces the available oil by 500 units', async () => {
            await EnsekApiTestAppActions.checkEnergyUnits('oil', startingOilAmount, buyAmount);
        });

        it('registers a new order has been created', async () => {
            await EnsekApiTestAppActions.checkOrders('Oil', buyAmount);
            //I've added a capital O to oil. Do we want that? Or is this a reportable defect?
        });
    });

    afterAll(async () => {

    });
});