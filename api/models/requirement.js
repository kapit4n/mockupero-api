module.exports = {
    attributes: {
        name: {
            type: 'string',
            defaultsTo: 'Project Name'
        },
        features: {
          collection: 'Feature',
          via: 'requirement'
        },
        project: {
            model: 'project'
        }
    }
};
