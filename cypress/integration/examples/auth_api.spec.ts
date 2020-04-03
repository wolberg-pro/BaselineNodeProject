
describe('Ath API', () => {
    context('.spec', () => {
        let user;
        beforeEach(async () => {
            user = await cy.fixture('user');
        })
        it('User Register', () => {
            cy.request('POST','/auth/register' , {
                "firstName": "userFisrtName",
                "lastName": "userLastName",
                "email": "user@test.io",
                "username": "user@test.io",
                "password": "1234"
            });
        })
    })
})
