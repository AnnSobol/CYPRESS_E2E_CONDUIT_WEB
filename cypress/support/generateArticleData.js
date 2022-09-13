import { faker } from '@faker-js/faker';

function generateArticleData() {
  const randomNumber = Math.random().toString().slice(2, 6);
  const articleTitle = faker.random.word() + '_' + randomNumber;
  const whatAbout = faker.random.words(6);
  const writeArticle = faker.random.words(50);
  const enterTag = faker.random.word();

  return { whatAbout, writeArticle, articleTitle, enterTag };
}

module.exports = {generateArticleData};