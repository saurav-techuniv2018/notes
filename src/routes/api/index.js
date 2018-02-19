const models = require('../../../models');

module.exports = [
  {
    path: '/notes',
    method: 'GET',
    config: {
      description: 'Get all the notes.',
      tags: ['api'],
    },
    handler: (request, response) => {
      models.notes.findAll()
        .then((notes) => {
          response({
            data: notes.map(note => ({
              id: note.noteId,
              title: note.title,
              note: note.note,
            })),
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            statusCode: 500,
            error: 'Could not retrieve list of notes.',
          });
        });
    },
  },
];
