import { assert, expect } from "chai";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const CapabilityService = require('../../../service/CapabilityService.ts');
import { Capability } from "../../../model/Capability";

const capability: Capability = {
    id: 1,
    name: "Capability 1"
};

describe('CapabilityService', function () {
    describe('getCapabilities', function () {
        it('should return capabilities from response', async () => {
            var mock = new MockAdapter(axios);

            const data = [capability];

            mock.onGet(CapabilityService.URL).reply(200, data);

            var results;
            try {
                results = await CapabilityService.getCapabilities();
                assert.deepStrictEqual(results[0], capability);
            } catch (error) {
                assert.fail('Unexpected error: ' + error.message);
            }
        })

        it('should throw an error if the request fails', async () => {
            var mock = new MockAdapter(axios);

            mock.onGet(CapabilityService.URL).reply(500);

            try {
                await CapabilityService.getCapabilities();
                //assert.fail('Expected an error to be thrown.');
            } catch (error) {
                assert.strictEqual(error.message, 'Could not get capabilities.');
            }
        })
    })
})