// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const { generateUser } = require("../support/generate");

const { generateArticleData } = require("../support/generateArticleData");

//---------------------REGISTER NEW USER----------------------//

Cypress.Commands.add('registerNewUser', () => {

  const {email, password, username} = generateUser();

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users',
    body: {
      user:
       {
        "username": username,
        "email": email,
        "password": password
      }
    }
  
  }).then(response => ({ ...response.body.user, ...email, password, username }));

});

//---------------------LOGIN USER----------------------//

Cypress.Commands.add('loginUser', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
          {
          "email": 'vaslo1984@ukr.net',
          "password": 'dkqb6v349'
        }
    } 
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
  
  })    
});

//---------------------CREATE ARTICLE----------------------//

Cypress.Commands.add('createArticle', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData(); 

    cy.request({
    
      method: 'POST',
      url: 'https://api.realworld.io/api/articles',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        article:
                {
            "title": articleTitle,
            "description": whatAbout,
            "body": writeArticle,
            "tagList": enterTag,
        }
      }
    }).then((resp) => {

      cy.visit(`/#/article/${resp.body.article.slug}`)
    
    })        
  })    
});

//---------------------REDIRECTED TO USER ARTICLE----------------------//

Cypress.Commands.add('redirectedToUserArticle', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
 
    cy.request({
    
      method: 'GET',
      url: 'https://api.realworld.io/api/articles/Create-a-new-implementation-1',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        article:
                {
            "slug": 'Create-a-new-implementation-1',
            "title": 'Create a new implementation',
        }
      }
    }).then((resp) => {

      cy.visit(`/#/article/${resp.body.article.slug}`)
    
    })        
  })    
});

//---------------------UNLIKED AUTHOR ARTICLE----------------------//

Cypress.Commands.add('unlikedAuthorArticle', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
 
    cy.request({
    
      method: 'DELETE',
      url: 'https://api.realworld.io/api/articles/Create-a-new-implementation-1/favorite',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        article:
                {
            "slug": 'Create-a-new-implementation-1',
            "title": 'Create a new implementation',
        }
      }
    }).then((resp) => {

      cy.visit(`/#/@Gerome`)
    
    })        
  })    
});

//---------------------LIKED AUTHOR ARTICLE----------------------//

Cypress.Commands.add('likedAuthorArticle', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
 
    cy.request({
    
      method: 'POST',
      url: 'https://api.realworld.io/api/articles/Create-a-new-implementation-1/favorite',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        article:
                {
            "slug": 'Create-a-new-implementation-1',
            "title": 'Create a new implementation',
        }
      }
    }).then((resp) => {

      cy.visit(`/#/@Gerome`)
    
    })        
  })    
});

//---------------------LIKED OWN ARTICLE----------------------//

Cypress.Commands.add('likedOwnArticle', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
 
    cy.request({
    
      method: 'POST',
      url: 'https://api.realworld.io/api/articles/Loan_0628-95858/favorite',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        article:
                {
            "slug": 'Loan_0628-95858',
            "title": 'Loan_0628',
            "description": 'er beyond nail Fresh Security Metal',
        }
      }
    }).then((resp) => {

      cy.visit(`/#/articles/${resp.body.article.slug}/favorite`)
    
    })        
  })    
});

//---------------------UNLIKED OWN ARTICLE----------------------//

Cypress.Commands.add('unlikedOwnArticle', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
 
    cy.request({
    
      method: 'DELETE',
      url: 'https://api.realworld.io/api/articles/Loan_0628-95858/favorite',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        article:
                {
            "slug": 'Loan_0628-95858',
            "title": 'Loan_0628',
            "description": 'er beyond nail Fresh Security Metal',
        }
      }
    }).then((resp) => {

      cy.visit(`/#/articles/${resp.body.article.slug}/favorite`)
    
    })        
  })    
});

//---------------------UNFOLLOWED----------------------//

Cypress.Commands.add('unfollowedToUserProfile', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
 
    cy.request({
    
      method: 'DELETE',
      url: 'https://api.realworld.io/api/profiles/Gerome/follow',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        profile:
                {
            "username": 'Gerome',
            "bio": 'null',
            "image": 'https://api.realworld.io/images/demo-avatar.png',
            "following": false,
        }
      }
    }).then(() => {

      cy.visit(`/#/@Gerome`)
    
    })        
  })    
});

//---------------------FOLLOWED----------------------//

Cypress.Commands.add('followedToUserProfile', () => {

  cy.request({
    
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user:
       {
        "email": 'vaslo1984@ukr.net',
        "password": 'dkqb6v349'
      }
    }
  
  }).then((resp) => {

    window.localStorage.setItem('jwt', resp.body.user.token);
 
    cy.request({
    
      method: 'POST',
      url: 'https://api.realworld.io/api/profiles/Gerome/follow',
      headers: {"authorization": `Token ${resp.body.user.token}`},
      body: {
        profile:
                {
            "username": 'Gerome',
            "bio": 'null',
            "image": 'https://api.realworld.io/images/demo-avatar.png',
            "following": true,
        }
      }
    }).then(() => {

      cy.visit(`/#/@Gerome`)
    
    })        
  })    
});







