/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose'),
homeModel = mongoose.model('Home'),
deviceModel = mongoose.model('Device'),
UserModel = mongoose.model('User');

function extract_data(req){
    var data = JSON.stringify(req.body);
    // console.log("********label :*********" + data.home_label);
    console.log("request data :" + data);
    var obj = JSON.parse(data);
    return obj;
//    var username = obj.owners[0].username;
}
// id_home, home_label, owners , priority, startdate, validuntil
async function updateHomeSettings (req) {
    var obj = extract_data(req);
    try {
        return homeModel.findOneAndUpdate({'id_home': obj.id_home}, {
            $set: {
                'home_label': obj.home_label,
                'owners': [{
//                    'username': obj.owners[0].username,
//                    'priority': obj.owners[0].priority,
                    'startdate': obj.owners[0].startdate,
                    'validUntil': obj.owners[0].validUntil 
                }]
            }
        }, { runValidators: true }, {new: true})
    } catch (error) {
        throw new Error(`Unable to update user with id "${userId}".`)
    }
}

// id_home, home_label, owners , priority, startdate, validuntil
async function addUser (req) {
    var obj = extract_data(req);
    try {
        return homeModel.findOneAndUpdate({'id_home': obj.id_home}, {
            $set: {
                'home_label': obj.home_label,
                'owners': [{
//                    'username': obj.owners[0].username,
//                    'priority': obj.owners[0].priority,
                    'startdate': obj.owners[0].startdate,
                    'validUntil': obj.owners[0].validUntil
                }]
            }
        }, {new: true})
    } catch (error) {
        throw new Error(`Unable to update user with id "${userId}".`)
    }
}

async function findHomeByUsername (username) {
    try {
        return User.findOne({'username': username})
    } catch (error) {
        throw new Error(`Unable to connect to the database.`)
    }
}

/* async function findDevices (home_id) {
    try {
//        return deviceModel.populate.findOne({'username': username});
        return deviceModel.find({ home: home_id })
        .populate('devices').exec((err, devices) => {
            console.log("Populated devices " + devices);
        })
    } catch (error) {
        throw new Error(`Unable to connect to the database.`)
    }
} */

// other methods

export default {
    updateHomeSettings,
    addUser,
    findHomeByUsername,
    findDevices
}