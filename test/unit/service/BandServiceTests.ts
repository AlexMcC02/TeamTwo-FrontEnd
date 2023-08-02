import { assert, expect } from "chai";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const BandService = require('../../../service/BandService.ts');
import { Band } from "../../../model/Band";

const band: Band = {
    id: 1,
    name: "Band 1"
};

describe('BandService', function () {
    describe('getBands', function () {
        it('should return bands from response', async () => {
            var mock = new MockAdapter(axios);

            const data = [band];

            mock.onGet(BandService.URL).reply(200, data);

            var results;
            try {
                results = await BandService.getBands();
                assert.deepStrictEqual(results[0], band);
            } catch (error) {
                assert.fail('Unexpected error: ' + error.message);
            }
        })

        it('should throw an error if the request fails', async () => {
            var mock = new MockAdapter(axios);

            mock.onGet(BandService.URL).reply(500);

            try {
                await BandService.getBands();
                assert.fail('Could not get Band Levels.');
            } catch (error) {
                assert.strictEqual(error.message, 'Could not get Band Levels.');
            }
        })
    })
})