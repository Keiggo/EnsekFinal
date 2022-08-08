import request from "supertest";
import { DateTime } from "luxon";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // this is to bypass certification errors

const baseUrl = 'https://ensekapicandidatetest.azurewebsites.net/';

export class EnsekApiTestAppActions {

    static async buyEnergy(energyId: number, quantity: number) {
        const response = await request(baseUrl).put(`/buy/${energyId}/${quantity}`)
        .expect(200);
    };
    
    static async checkEnergyUnits(electricUnits: number = 4322, gasUnits: number = 3000, nuclearUnits: number = 0, oilUnits: number = 20) {
        const response = await request(baseUrl).get('/energy');
        expect((response.body)).toMatchObject((JSON.parse(`{"electric":{"energy_id":3,"price_per_unit":0.47,"quantity_of_units":${electricUnits},"unit_type":"kWh"},"gas":{"energy_id":1,"price_per_unit":0.34,"quantity_of_units":${gasUnits},"unit_type":"m³"},"nuclear":{"energy_id":2,"price_per_unit":0.56,"quantity_of_units":${nuclearUnits},"unit_type":"MW"},"oil":{"energy_id":4,"price_per_unit":0.5,"quantity_of_units":${oilUnits},"unit_type":"Litres"}}`)))       
    };

    static async login(username: string, password: string, expectedResponse: number) {
        return await request(baseUrl).post(`/login`)
        .send(JSON.parse(`{"username":"${username}","password":"${password}"}`))
        .expect(expectedResponse);
    };

    static async checkOrders(energyType: string, unitsSold: number) {
        const now = DateTime;

        const response =  await request(baseUrl).get(`/orders`);
        expect(JSON.stringify(response.body)).toContain(`{"fuel":"${energyType}","id":31fc32da-bccb-44ab-9352-4f43fc44ed4b","quantity":${unitsSold},"time":"${now.fromHTTP.toString()}"}`);
    };

    static async resetEnergyDataToDefault() {
        return await request(baseUrl).post('/reset')
        .send('')
        .expect(200);
    };
}