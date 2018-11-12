import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'
import {Acts} from './Acts'

export const Bids = new Mongo.Collection('bids');

//Bid schema
// Amount
// Name
// ID (just in case)
Bids.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;},
});

if(Meteor.isServer)
{
    Meteor.publish('bids', () => {
        return Bids.find({});
    });
    Meteor.publish('bids.forCurrAct', () => {
        let currAct = Acts.findOne({status : "Bidding"});
        //console.log(Bids.find({actName : currAct.name}).fetch());
        return Bids.find({actName : currAct.name});
    });
    Meteor.publish('bids.byUser', () => {
        return Bids.find({userID : Meteor.user()._id});
    });
}

Meteor.methods({
    'bids.bid'(amount) {
        check(amount, Number);
        if(!Meteor.user())
        {
            throw new Meteor.Error('not-authorized', 'You are not logged in');
        }
        let currAct = Acts.findOne({status : "Bidding"});
        if(!currAct) 
        {
            throw new Meteor.Error('non-applicable-bid', 'There are no acts currently that can be bidded on');
        }
        Bids.insert({userID : Meteor.user()._id, name : Meteor.user().services.facebook.name, amount, actName : currAct.name, date : new Date(), status : "Received"});
    },
    'bids.update'(donationID)
    {
        check(donationID, String);
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        Bids.update({_id : donationID}, {$set : {status : "Fufilled"}});
    }
});