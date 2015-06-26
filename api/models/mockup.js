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
        description: {
            type: 'string',
            defaultsTo: ''
        },
        project: {
            model: 'project'
        },
        feature: {
          model: 'feature'
        },
        members: {
          collection: 'Member',
          via: 'mockup'
        }
    }
};
