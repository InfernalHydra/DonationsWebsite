import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'
import {Acts} from './Acts'
import {Random} from 'meteor/random'


export const Bids = new Mongo.Collection('bids');
export var BidsAggregate = new Mongo.Collection('bids.aggregate');
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
    Meteor.publish('bids.byAct', () => {
        let pipeline = [{
            $project : {
                _id : "$actName",
                totalAmount : {$sum : "$amount"},
                count : {$sum : 1}
            }
        }];
        let foo = [];
        foo = Bids.aggregate(pipeline, {status : "Fufilled"});
        console.log(foo);
        // each((bid) => {
        //     self.added('bids.aggregate', Random.id(), {actName : bid._id, totalAmount : bid.totalAmount, count : bid.count});
        // });
        return BidsAggregate.find({});
    });
}

Meteor.methods({
    'bids.bid'(donationID, amount) {
        check(amount, Number);
        check(donationID, String);
        if(!Meteor.user())
        {
            throw new Meteor.Error('not-authorized', 'You are not logged in');
        }
        console.log(donationID);
        let currActBid = Acts.findOne({_id : donationID, status : {$in : ["Completed", "Bidding"]}});
        if(!currActBid) 
        {
            throw new Meteor.Error('non-applicable-bid', 'There are no acts currently that can be bidded on');
        }

        let possBid = Bids.findOne({userID : Meteor.user()._id, actName : currActBid.name});
        if(possBid)
        {
            if(amount < possBid.amount)
            {
                throw new Meteor.Error('nonapplicable-amount', 'The amount you wish to donate is lower than your previous donation');   
            }
            let bidID = possBid._id;
            Bids.update({_id : bidID}, {$set : {amount}}); 
        }
        else {
            Bids.insert({userID : Meteor.user()._id, name : Meteor.user().services.facebook.name, amount, actName : currActBid.name, date : new Date(), status : "Received"});
        }
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