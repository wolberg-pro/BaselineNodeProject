import * as nock from 'nock';
import request from 'supertest';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';
import {CreateUser} from '../../../src/database/factories/UserFactory';

describe('/api/users', () => {

    let userData;
    // let bruceAuthorization: string;
    let settings: BootstrapSettings;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ migrate: true });
        userData = await CreateUser(1);
        // bruce = await runSeed<User>(CreateBruce);
        // bruceAuthorization = Buffer.from(`${bruce.username}:1234`).toString('base64');
    });

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // create user test
    // -------------------------------------------------------------------------
    test('POST: / should create user with token', async (done) => {
        const postData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            username: userData.username,
            password: '1234',
        };
        const response = await request(settings.app)
            .post('/api/users')
            .send(postData)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBe(1);
        done();
    });
    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return a list of users', async (done) => {
        const response = await request(settings.app)
            .get('/api/users')
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBe(1);
        done();
    });

    test('GET: /:id should return bruce', async (done) => {
        const response = await request(settings.app)
            .get(`/api/users/${bruce.id}`)
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(bruce.id);
        expect(response.body.firstName).toBe(bruce.firstName);
        expect(response.body.lastName).toBe(bruce.lastName);
        expect(response.body.email).toBe(bruce.email);
        done();
    });

});
