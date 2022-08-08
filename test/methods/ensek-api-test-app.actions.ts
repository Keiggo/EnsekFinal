import request from 'supertest';
import { DateTime } from 'luxon';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // this is to bypass certification errors

const baseUrl = 'https://ensekapicandidatetest.azurewebsites.net/';

export class EnsekApiTestAppActions {

    static async buyEnergy(energyId: number, quantity: number) {
        return await request(baseUrl).put(`/buy/${energyId}/${quantity}`)
        .expect(200);
    };
    
    static async checkEnergyUnits(energyType: string, startingAmount: number, amountBought: number) {
        const response = await this.getAllCurrentEnergyUnitAmounts();
        expect(response[energyType].quantity_of_units).toBe(startingAmount - amountBought);
    };

    static async login(username: string, password: string, expectedResponse: number) {
        return await request(baseUrl).post(`/login`)
        .send(JSON.parse(`{"username":"${username}","password":"${password}"}`))
        .expect(expectedResponse);
    };

    static async checkOrders(energyType: string, unitsSold: number) {
        const now = DateTime.now().toHTTP().toString();

        const response =  await request(baseUrl).get(`/orders`);
        expect(JSON.stringify(response.body)).toContain(`"fuel":"${energyType}","quantity":${unitsSold},"time":"${now.slice(0, -6)}`);
    };

    static async resetEnergyDataToDefault() {
        return await request(baseUrl).post('/reset')
        .send('')
        .expect(200);
    };

    static async checkNoEnergyMessage(energyId: number, energyName: string) {
        const response = await this.buyEnergy(energyId, 500);
        expect(JSON.stringify(response.body)).toBe(`{"message":"There is no ${energyName} fuel to purchase!"}`);    
    };

    static async getAllCurrentEnergyUnitAmounts() {
        return await (await request(baseUrl).get('/energy')).body;
    };

    static async getSingleCurrentEnergyUnitAmount(energyType: string) {
        const allEnergyUnitAmounts = await this.getAllCurrentEnergyUnitAmounts();
        return await allEnergyUnitAmounts[energyType].quantity_of_units;
    };
};