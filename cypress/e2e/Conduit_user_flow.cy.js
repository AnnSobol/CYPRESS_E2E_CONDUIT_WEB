/// <reference types="cypress" />

const { generateUser } = require("../support/generate");

const { generateArticleData } = require("../support/generateArticleData");

const { generateCommentData } = require("../support/generateCommentData");

//--------- REGISTRATION ----------//

describe('Registration (positive)', () => {
  
  it('should allow to register a new user', () => {

    cy.visit('/')

    const {email, password, username} = generateUser();

    cy.get('[href="#register"]')
      .click();

    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      .type(email);
      
    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.nav-link')  
      .should('contain', username);  
        
  });
});

describe('Registration (negative)', () => {

  beforeEach(() => {

    cy.visit('/#/register')

  });

  it('should not allow to register with an existing username', () => {

    cy.registerNewUser().then(user => {

      cy.get('[placeholder="Username"]')
      .type(user.username);

      cy.get('[placeholder="Email"]')
        .type('new_' + user.email);
      
      cy.get('[placeholder="Password"]')
        .type(user.password);

      cy.contains('.btn', 'Sign in')
        .click();  

      cy.get('.error-messages > li')  
        .should('contain', 'username has already been taken');  
    })       
  });

  it('should not allow to register with an existing email', () => {

    cy.registerNewUser().then(user => {

      cy.get('[placeholder="Username"]')
        .type(user.username + '_new');

      cy.get('[placeholder="Email"]')
        .type(user.email);
      
      cy.get('[placeholder="Password"]')
        .type(user.password);

      cy.contains('.btn', 'Sign in')
        .click();  

      cy.get('.error-messages > li')  
        .should('contain', 'email has already been taken');
    })          
  });

  it('should not allow to register with blank username field', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')

    cy.get('[placeholder="Email"]')
      .type(email);
      
    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.error-messages > li')  
      .should('contain', 'username can\'t be blank');  
        
  });

  it('should not allow to register with blank email field', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      
    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.error-messages > li')  
      .should('contain', 'email can\'t be blank');  
        
  });

  it('should not allow to register with blank password field', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      .type(email);    

    cy.get('[placeholder="Password"]')

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.error-messages > li')  
      .should('contain', 'password can\'t be blank');  
        
  });

  it('should not allow to register when email has invalid format', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      .type('email');    

    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  
    
    cy.wait(2000);  
     
    cy.url().should('include', '/#/register');   

  });
});

//--------- END OF REGISTRATION ----------//
//--------- LOGIN --------------------//

describe('Login (positive)', () => {

  it('should allow to login registered user', () => {

    cy.visit('/')

    cy.get('[href="#login"]')
      .click();

    cy.registerNewUser().then(user => {
  
      cy.get('[placeholder="Email"]')
        .type(user.email);
  
      cy.get('[placeholder="Password"]')
        .type(user.password);
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.nav-link')  
        .should('contain', user.username);   

    })  
  });
});

describe('Login (negative)', () => {

  beforeEach(() => {

    cy.visit('/#/login')

  });

  it('should not allow to login when email is blank', () => {

    cy.registerNewUser().then(user => {
    
      cy.get('[placeholder="Email"]')
  
      cy.get('[placeholder="Password"]')
        .type(user.password);
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.error-messages > li')  
        .should('contain', 'email can\'t be blank');   
    
    })    
  });

  it('should not allow to login when password is blank', () => {

    cy.registerNewUser().then(user => {
  
      cy.get('[placeholder="Email"]')
        .type(user.email);
  
      cy.get('[placeholder="Password"]')
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.error-messages > li')  
        .should('contain', 'password can\'t be blank');  

    })    
  });

  it('should not allow to login with not registered email', () => {

    cy.registerNewUser().then(user => {
  
      cy.get('[placeholder="Email"]')
        .type('new_' + user.email);
  
      cy.get('[placeholder="Password"]')
        .type(user.password);
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.error-messages > li')  
        .should('contain', 'email or password is invalid');

    })    
  });

  it('should not allow to login with not registered password', () => {

    cy.registerNewUser().then(user => {
  
    cy.get('[placeholder="Email"]')
      .type(user.email);
  
    cy.get('[placeholder="Password"]')
      .type('new' + user.password);
  
    cy.get('.btn') 
      .should('contain', 'Sign in')
      .click();

    cy.get('.error-messages > li')  
      .should('contain', 'email or password is invalid');

    })  
  });
});
  
//--------- END OF LOGIN ----------//
//--------- MAIN PAGE -------------------------------//

describe('Main page (positive)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/');

  });  

  it('should allow to Global Feed screen', () => {

    cy.wait(2000);

    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link')
      .click();

  });    

  it('should allow to Popular tag implementations', () => {

    cy.wait(2000);

    cy.get('.sidebar')
      .click(60, 45, {multiple: true});

    cy.get('[class="nav-link active"]')
      .should('have.text', ' implementations')
    
  });   

  it('should allow access to other author profiles', () => {

    cy.wait(2000);

    cy.get('.sidebar')
      .click(60, 45, {multiple: true});

    cy.get(':nth-child(1) > .article-meta > .info > .author')
      .click()  

    cy.get('.user-img')
      .should('be.visible');  
    
  }); 

  it('should allow to follow the user', () => {

    cy.unfollowedToUserProfile();

    cy.get('[class="btn btn-sm action-btn btn-outline-secondary"]')
      .click();

    cy.get('[class="btn btn-sm action-btn btn-secondary"]') 
      .should('contain', 'Unfollow') 

  }); 

  it('should allow to unfollow the user', () => {

    cy.followedToUserProfile();

    cy.get('[class="btn btn-sm action-btn btn-secondary"]') 
      .click();

    cy.get('[class="btn btn-sm action-btn btn-outline-secondary"]')  
      .should('contain', 'Follow')

  }); 
  
  
  it('should allow to like articles of other users', () => {

    cy.unlikedAuthorArticle();
    
    cy.wait(4000);

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click(); 
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('have.focus')   

      
  });  

  it('should allow to unlike other user articles', () => {

    cy.likedAuthorArticle();

    cy.wait(4000);  

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click()  

    cy.get('body')
      .click('right');  
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('not.have.focus') 

  });  

  it('should allow to read articles of other users', () => {

    cy.wait(2000);

    cy.get('.sidebar')
      .click(60, 45, {multiple: true});

    cy.wait(2000);  

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click() 

    cy.get('[href="#article/Create-a-new-implementation-1"]') 
      .click();

    cy.url().should('include', '#/article');   
      
  });  

  it.only('should allow to post comment for other user articles', () => {

    const {comment} = generateCommentData();

    cy.redirectedToUserArticle();

    cy.get('[placeholder="Write a comment..."]')
      .type(comment)

    cy.get('[class="btn btn-sm btn-primary"]') 
      .click();
      
    cy.get(':nth-child(1) > .card-block > .card-text') 
      .should('have.text', comment)
    
  });  

  it('should allow to delete the posted comment', () => {

    const {comment} = generateCommentData();

    cy.redirectedToUserArticle();

    cy.get('[placeholder="Write a comment..."]')
      .type(comment)

    cy.get('[class="btn btn-sm btn-primary"]') 
      .click();  

    cy.get(':nth-child(1) > .card-footer > .mod-options > .ion-trash-a')
      .click(); 
    
    cy.get(':nth-child(1) > .card-block > .card-text')
      .should("not.have.text", comment);  

  });  
});  

//--------- END OF MAIN PAGE -------------------//
//--------- ARTICLE --------------------//

describe('Article (positive)', () => {

  it('should allow to create a new article filing in required fields', () => {

    cy.visit('/#/login')

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData(); 

    cy.registerNewUser().then(user => {
  
      cy.get('[placeholder="Email"]')
        .type(user.email);
    
      cy.get('[placeholder="Password"]')
        .type(user.password);
    
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();
  
      cy.get('.nav-link')  
        .should('contain', user.username);
  
      })  
    
      cy.get('.ion-compose')
        .click();
      
      cy.get('[placeholder="Article Title"]')
        .type(articleTitle);     

      cy.get('[placeholder="What\'s this article about?"]')
        .type(whatAbout);  

      cy.get('[placeholder="Write your article (in markdown)"]')
        .type(writeArticle);  

      cy.get('[placeholder="Enter tags"]')
        .type(enterTag);  
       
      cy.get('.btn') 
        .click(); 

      cy.get('h1')
        .should('contain', articleTitle); 

  });

  it('should allow to edit created article', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.createArticle();

    cy.get('.ion-edit')
      .click()
    cy.wait(2000);

    cy.get('[placeholder="Article Title"]') 
      .type('{selectall}{del}')
    cy.wait(2000);

    cy.get('[placeholder="Article Title"]') 
      .type(articleTitle);

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);  

    cy.get('[class="btn btn-lg pull-xs-right btn-primary"]') 
      .click(); 

    cy.get('h1')
      .should('contain', articleTitle)  

  });  

  it('should allow to post a comment to article', () => {

    cy.createArticle();

    cy.get('.form-control')
      .type('I like this article');
    
    cy.get('[class="btn btn-sm btn-primary"]')  
      .click();

    cy.get('.card-text')  
      .should('contain', 'I like this article')

  });    

  it('should allow to delete created comment', () => {

    cy.createArticle();

    cy.get('.form-control')
      .type('Greate article');
    
    cy.get('[class="btn btn-sm btn-primary"]')  
      .click();
      cy.wait(2000);

    cy.get('.mod-options')  
      .click()
      
    cy.get('.card-text')
      .should("not.have.text", "Greate article");

  }); 

  it('should allow to delete created article', () => {

    cy.createArticle();

    cy.get('.ion-trash-a')
      .click();
    cy.wait(2000);

    cy.url()
      .should('include', 'https://react-redux.realworld.io/#/');  

  });   

});

describe('Article (negative)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/#/editor');

  });

  it('should not allow to create a new article when Article Title is blank ', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.get('[placeholder="Article Title"]')     

    cy.get('[placeholder="What\'s this article about?"]')
      .type(whatAbout);  

    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(writeArticle);  

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);   
       
    cy.get('.btn') 
      .click(); 

    cy.get('[class="error-messages"]')
      .should('contain', 'title can\'t be blank'); 

  });  
    
  it('should not allow to create a new article when description is blank ', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.get('[placeholder="Article Title"]')  
      .type(articleTitle);      

    cy.get('[placeholder="What\'s this article about?"]')

    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(writeArticle);  

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);   
       
    cy.get('.btn') 
      .click(); 

    cy.get('[class="error-messages"]')
      .should('contain', 'description can\'t be blank'); 

  });  

  it('should not allow to create a new article when body is blank ', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.get('[placeholder="Article Title"]')  
      .type(articleTitle);      

    cy.get('[placeholder="What\'s this article about?"]')
      .type(whatAbout);  

    cy.get('[placeholder="Write your article (in markdown)"]')

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);   
       
    cy.get('.btn') 
      .click(); 

    cy.get('[class="error-messages"]')
      .should('contain', 'body can\'t be blank'); 

  });  
});

//--------- END OF ARTICLE ----------//
//--------- SETTINGS --------------------//

describe('Settings (positive)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/');

  });  

  it('should allow to update current settings', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    const {email, password, username} = generateUser();
  
    cy.get('.ion-gear-a')
      .click();

    cy.url()
      .should('include', '/#/settings')
    
    cy.get('[placeholder="Username"]')
      .type('{selectall}{del}');

    cy.get('[placeholder="Username"') 
      .type(username);

    cy.get('[placeholder="Short bio about you"]')
      .type(whatAbout);

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();

    cy.get('.nav-link')
      .should('contain', username)     
      
  });  

  it('should allow to logout', () => {

    cy.get('.ion-gear-a')
      .click();

    cy.get('[class="btn btn-outline-danger"]') 
      .click();
      
    cy.wait(2000);  

    cy.get('[href="#login"]')
      .should('contain', 'Sign in')

  });    
});  

describe('Settings (negative)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/#/settings');

  });  

  it('should not allow to update settings when username field is empty', () => {

    cy.get('[placeholder="Username"]')
      .type('{selectall}{del}');

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();

    cy.wait(4000);  

    cy.get('.error-messages > li')  
      .should('contain', 'username can\'t be blank');  

  });   

  it('should not allow to update settings when email field is empty', () => {

    cy.get('[placeholder="Email"]')
      .type('{selectall}{del}');

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();
      
    cy.wait(2000);  
      
    cy.get('.error-messages > li')  
      .should('contain', 'email can\'t be blank');  

  });    

  it('should not allow to update settings with invalid format email', () => {

    cy.get('[placeholder="Email"]')
      .type('{selectall}{del}');

    cy.get('[placeholder="Email"]')
      .type('email');  

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();
      
    cy.wait(2000);   

    cy.url().should('include', '/#/settings');

  });
});   

//--------- END OF SETTINGS -------------------//
//--------- PROFILE SCREEN --------------------//

describe('Profile screen (positive)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/');

  });  

  it('should allow to like own article', () => {
    
    cy.unlikedOwnArticle();

    cy.get('.user-pic')
      .click();

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click();

    cy.wait(2000);  
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('have.focus')

  }); 
  
  it('should allow to unlike own article', () => {

    cy.likedOwnArticle();
    
    cy.get('.user-pic')
      .click();

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click();

    cy.get('body')
      .click('right');   

    cy.wait(2000);  
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('not.have.focus')

  });   

  it('should allow to Favorited Articles screen', () => {

    cy.get('.user-pic')
      .click();
    
    cy.contains('a', 'Favorited Articles')
      .click();

    cy.url().should('include', '/favorites');  
      
  });    
});   

//--------- END OF PROFILE SCREEN -------------------//

