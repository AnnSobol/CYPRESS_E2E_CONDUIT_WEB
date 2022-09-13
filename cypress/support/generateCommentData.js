import { faker } from '@faker-js/faker';

function generateCommentData() {

  const comment = faker.random.words(3);

  return { comment };
}

module.exports = {generateCommentData};