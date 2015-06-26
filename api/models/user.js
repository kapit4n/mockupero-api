module.exports = {
    attributes: {
        // Primitive attributes
        name: {
            type: 'string',
            defaultsTo: ''
        },
        members: {
          collection: 'Member',
          via: 'user'
        }
    }
};
