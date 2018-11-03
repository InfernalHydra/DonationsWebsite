import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'
import {ADMIN_KEY} from '../constants/constants'

export default Users = Meteor.users;

if(Meteor.isServer)
{
    Meteor.publish('users', () => {
        return Users.find({});
    });
}

Meteor.methods({
    'users.validateUser'(userID, val) {
        check(userID, String);
        check(val, String);
        //console.log(ADMIN_KEY);
        if(val === ADMIN_KEY)
        {
            //console.log('i did it');
            //let currUser = Users.find({"_id" : userID}).fetch()[0];
            Users.update(userID, {$set : {role : 1}});
            //console.log(currUser);
        }
    }
});