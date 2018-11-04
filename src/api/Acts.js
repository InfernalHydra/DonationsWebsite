import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'

export const Acts = new Mongo.Collection('acts');

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
    'acts.addAct'(name, author)
    {
        check(name, String);
        check(author, String);
        //console.log('asdfdsafsa');
        Acts.insert({name, author, amount : 0, donator : "", donatorID: "", status : "Scheduled"});
    },
    'acts.startNextAct'()
    {
        let nextActID = Acts.findOne({status : "Scheduled"})._id;
        // console.log(nextActID);
        Acts.update({_id : nextActID}, {$set : {status : "In Progress"}});
    },
    'acts.stopCurrentAct'()
    {
        let currActID = Acts.findOne({status : "In Progress"})._id;
        Acts.update({_id : currActID} , {$set : {status : "Ended"}});
    },
    'acts.startBids'()
    {
        let prevActID = Acts.findOne({status : "Ended"})._id;
        Acts.update({_id: prevActID}, {$set : {status : "Bidding"}});
    },
    'acts.stopBids'()
    {
        let prevActID = Acts.findOne({status : "Bidding"})._id;
        Acts.update({_id: prevActID}, {$set : {status : "Completed"}});
    },
});