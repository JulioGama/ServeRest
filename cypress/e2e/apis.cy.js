/// <reference types="Cypress"/>

describe('ServeRest API', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  let authToken;
  it('API Status check ', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password')
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        email: email,
        password: password
      }
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Login realizado com sucesso')

      authToken = response.body.token;
    });
  });

    it('Registered users and confirmation of Admin User', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then(response => {
        expect(response.status).to.equal(200)

        const usuarios = response.body.usuarios;
        const emailUsuario = 'fulano@qa.com'
        const usuarioEncontrado = usuarios.find(user => user.email === emailUsuario)

        expect(usuarioEncontrado).to.exist;
        expect(usuarioEncontrado.email).to.equal(emailUsuario)
        expect(usuarioEncontrado.administrador).to.equal("true")

      })
    });

    it('Create normal user', () => {
      cy.request({
        method: 'POST',
        url: '/usuarios',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
            "nome": "Usuario Teste",
            "email": "teste@teste.com.br",
            "password": "teste",
            "administrador": "false"
        }
    }).then(response => {
      expect(response.status).to.equal(201)
      expect()
    })
  });


})