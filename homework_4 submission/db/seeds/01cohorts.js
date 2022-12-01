/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const faker = require('faker');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .del()
    .then(() => {
      const data = Array.from({ length: 10 }).map(() => {
        return {
          name: faker.company.bs(),
          logoUrl: faker.image.animals(200, 200, true),
          members: Array.from({ length: 21 })
            .map(() => {
              return ` ${faker.name.firstName()}`;
            })
            .toString(),
        };
      });
      return knex('cohorts').insert(data);
    });
};
