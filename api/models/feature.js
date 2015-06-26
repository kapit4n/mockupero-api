module.exports = {
    attributes: {
        name: {
            type: 'string',
            defaultsTo: 'Project Name'
        },
        mockups: {
          collection: 'Mockup',
          via: 'feature'
        },
        requirement: {
            model: 'requirement'
        }
    }
};
