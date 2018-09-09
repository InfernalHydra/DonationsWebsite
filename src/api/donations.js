import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'

export const Donations = new Mongo.Collection('donations');

if(Meteor.isServer)
{
    Meteor.publish('donations', () => {
        return Donations.find({});
    })
}

Meteor.methods({
    'donations.insert'(){

    },
});