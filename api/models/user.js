module.exports = {
    attributes: {
        // Primitive attributes
        name: {
            type: 'string',
            defaultsTo: ''
        },
        projects: {
            collection: 'projectShare',
            via: 'user'
        },
    }
};
