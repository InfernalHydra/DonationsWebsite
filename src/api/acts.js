import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'

export const Acts = new Mongo.Collection('donations');

//Schema
// Act Name - string
// Act Authors - string array
// Donation amount - integer
// Donation author - string
// Finished - bool

if(Meteor.isServer)
{
    Meteor.publish('acts', () => {
        return Acts.find({});
    })
}

Meteor.methods({
    'Acts.addAct'(name, author, amount, donator, donatorID)
    {
        check(name, String);
        check(author, String);
        check(amount, Number);
        check(donator, String);
        check(donatorID, String);
    }
});