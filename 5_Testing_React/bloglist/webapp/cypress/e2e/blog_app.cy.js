describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Nguyen Hoang',
            username: 'Caesar',
            password: 'hoangoccho58',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    // 1) Open
    it('Login form is shown', function () {
        cy.contains('Blogs');
        cy.contains('Login');
    });

    // // 2) Login
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('Login').click();
            cy.get('#username').type('Caesar');
            cy.get('#password').type('hoangoccho58');
            cy.get('#login-button').click();
            cy.contains('Logout');
        });

        it.only('fails with wrong credentials', function () {
            cy.contains('Login').click();
            cy.get('#username').type('Caesar');
            cy.get('#password').type('nothing');
            cy.get('#login-button').click();
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border', '4.66667px solid rgb(255, 0, 0)');

            cy.get('html').should('not.contain', 'Logout');
        });
    });

    // // 3) After logged in
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'Caesar', password: 'hoangoccho58' });
        });

        it('A new blog can be created', function () {
            cy.createBlog({
                title: 'A blog created by Caesar',
                author: 'Caesar',
                url: 'https://www.hoangyeudoi.com/',
            });

            cy.contains('A blog created by Caesar');
        });

        describe('Add 3 blogs and manipulate on them', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'The first blog',
                    author: 'Caesar',
                    url: 'https://www.hoangyeudoi.com/',
                });
                cy.createBlog({
                    title: 'The second blog',
                    author: 'Caesar',
                    url: 'https://www.hoangyeudoi.com/',
                });
                cy.createBlog({
                    title: 'The third blog',
                    author: 'Caesar',
                    url: 'https://www.hoangyeudoi.com/',
                });
            });

            it('One of those blogs can be liked', function () {
                cy.contains('The first blog').parent().contains('view').click();
                cy.get('#like-h4').contains('like').click();
            });

            it('One of those blogs can be removed', function () {
                cy.contains('The third blog').parent().contains('view').click();
                cy.contains('Delete').click({ force: true });
            });

            it('A blog cant be deleted by any one else, but the author', () => {
                cy.login({ username: 'Caesar', password: 'hoangoccho58' });

                cy.createBlog({
                    title: 'A fourth blog created by Caesar',
                    author: 'Caesar',
                    url: 'https://www.hoangyeudoi.com',
                });

                cy.contains('Logout').click();

                cy.login({ username: 'Caesar', password: 'hoangoccho58' });

                cy.contains('A fourth blog created by Caesar').contains('view').click();

                cy.contains('Delete').should('not.exist');
            });

            it('they are ordered by the number of likes in descending order', async function () {
                cy.contains('The third blog').parent().find('button').click();
                cy.get('#like-button').click().wait(500).click().wait(500);
                cy.contains('The third blog').parent().find('button').click();

                cy.contains('The second blog').parent().find('button').click();
                cy.get('#like-button').click().wait(500).click().wait(500).click().wait(500);

                cy.get('.blog').eq(0).should('contain', 'second blog');
                cy.get('.blog').eq(1).should('contain', 'third blog');
                cy.get('.blog').eq(2).should('contain', 'first blog');
            });
        });
    });
});
