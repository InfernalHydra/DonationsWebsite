import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'

export const Bids = new Mongo.Collection('bids');

//Bid schema
// Amount
// Name
// ID (just in case)
if(Meteor.isServer)
{
    Meteor.publish('bids', () => {
        return Bids.find({});
    });
}
Meteor.methods({
    'bids.bid'(amount) {
        if(!Meteor.user())
        {
            throw new Meteor.Error('not-authorized', 'You are not logged in');
        }

    },
});