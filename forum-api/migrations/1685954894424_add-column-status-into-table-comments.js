/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('comments', {
    deleted: {
      type: 'boolean',
      default: 'FALSE',
    },
  });

  pgm.sql('UPDATE comments SET deleted=FALSE WHERE deleted IS NULL');
};

exports.down = (pgm) => {
  pgm.dropColumn('comments', 'deleted');
};
