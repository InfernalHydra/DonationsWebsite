import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'
import {ADMIN_KEY} from '../../server/keys'

export default Users = Meteor.users;

Meteor.users.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;},
});

if(Meteor.isServer)
{
    Meteor.publish('users', () => {
        return Users.find({});
    });
}

Meteor.methods({
    'users.validateUser'(val) {
        check(val, String);
        //console.log(ADMIN_KEY);
        if(val === ADMIN_KEY)
        {
            Users.update(this.userId, {$set : {role : 1}});
        }
    }
});