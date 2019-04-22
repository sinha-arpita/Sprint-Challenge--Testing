
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'chess',genre: 'logic',releaseYear: 1950},
        {title: 'cricket',genre: 'sportive',releaseYear: 1850},
        
        
      ]);
    });
};

