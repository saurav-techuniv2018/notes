const joi = require('joi');

const models = require('../../../models');

module.exports = [
  {
    path: '/api/notes',
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
  {
    path: '/api/notes',
    method: 'PUT',
    config: {
      description: 'Replace the list of notes provided in the payload with the ones in the database',
      tags: ['api'],
      validate: {
        payload: {
          notes: joi.array().items(joi.object().keys({
            id: joi.number().integer().min(0),
            title: joi.string().required(),
            note: joi.string().required(),
          })),
        },
      },
    },
    handler: (request, response) => {
      models
        .notes
        .destroy({
          truncate: true,
          restartIdentity: true,
        })
        .then(() => {
          const notesWithIdProperty = request.payload.notes.map(note => ({
            noteId: note.id,
            title: note.title,
            note: note.note,
          }));

          return models.notes.bulkCreate(notesWithIdProperty);
        })
        .then((newNotes) => {
          response({
            data: newNotes.map(note => ({
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
            error: 'Could not update notes in the database.',
          });
        });
    },
  },
];
