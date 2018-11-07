import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'

export const Bids = new Mongo.Collection('bids');

if(Meteor.isServer)
{
    Meteor.publish('bids', () => {
        return Bids.find({});
    });
}