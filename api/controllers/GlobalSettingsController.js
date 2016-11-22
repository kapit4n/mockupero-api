/**
 * GlobalSettingsController
 *
 * @description :: Server-side logic for managing GlobalSettings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getByUserId: function(req, res) {
        var params = req.params.all();
        GlobalSettings.findOne({ userId: params.userId }).exec(function(err, config) {
            if (err) {
                return res.json({ "err": err });
            }
            return res.json(config)
        });
    },
    saveByUserId: function(req, res) {
        var params = req.params.all();
        GlobalSettings.findOne({ userId: params.userId }).exec(function(err, config) {
            if (err) {
                return res.json({ "err": err });
            }
            if (config) {
                GlobalSettings.update({ userId: params.userId }, JSON.parse(params.globalSettings)).exec(function afterwards(err, updated) {

                    if (err) {
                        return res.json(err)
                    }
                    return res.json(updated[0])
                });
            } else {
                GlobalSettings.create(JSON.parse(params.globalSettings)).exec(function afterwards(err, saved) {

                    if (err) {
                        return res.json(err)
                    }
                    return res.json(saved)
                });
            }

        });
    },
};
