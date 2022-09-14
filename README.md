
# FIRST OF ALL YOU MUST READ README.md FOR FURTHER INSTRUCTION

## FIRST STEP (Instalation cypress on your local machine)

Installation on Windows:

  1. [Instalation video](https://www.youtube.com/watch?v=F53rDUwiAbU)
  2. [Installation guide](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Windows)

Installation on Linux:

   1.[Cypress guide](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Linux)

## SECOND STEP

  1. Install necessary libs: sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
  2. Create cypress project directory with terminal and move there: mkdir ~/cypress_test_project && cd ~/cypress_test_project
  3. Clone the repository in your created directory cypress_test_project with command: git clone https://github.com/Podpalii/Cypress_e2e_Conduit_Web.git 
  4. Move to the project directory with command: cd ~/Cypress_e2e_Conduit_Web
  5. Install cypress with command: npm install cypress --save-dev
  6. If you don't have installed `Faker` plugin, run the command: npm install faker@5.5.3
  7. After successful Cypress installation in the directory with your project run the command: npx cypress open
