module.exports = {
    attributes: {
        // Primitive attributes
        name: {
            type: 'string',
            defaultsTo: 'Project Name'
        },
        state: {
            type: 'string',
            defaultsTo: 'New'
        },
        type: {
            type: 'string',
            defaultsTo: 'Design'
        },
        description: {
            type: 'string',
            defaultsTo: ''
        },
        mockups: {
            collection: 'mockup',
            via: 'project'
        },
        members: {
          collection: 'Member',
          via: 'project'
        },
        requirements: {
          collection: 'Requirement',
          via: 'project'
        }
    }
};
