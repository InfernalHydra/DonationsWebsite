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
Acts.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;},
});

const LISTS_METHODS = _.pluck([
    insert,
    makePublic,
    makePrivate,
    updateName,
    remove,
  ], 'name');
  
  // Only allow 5 list operations per connection per second
  
  if (Meteor.isServer) {

  }

if(Meteor.isServer)
{
    DDPRateLimiter.addRule({
        name(name) {
          return _.contains(LISTS_METHODS, name);
        },
    
        // Rate limit per connection ID
        connectionId() { return true; }
      }, 5, 1000);

    Meteor.publish('acts', () => {
        return Acts.find({});
    });
}

Meteor.methods({
    'acts.addAct'(name, author)
    {
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        check(name, String);
        check(author, String);
        //console.log('asdfdsafsa');
        Acts.insert({name, author, status : "Scheduled"});
    },
    'acts.startNextAct'()
    {
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        let nextActID = Acts.findOne({status : "Scheduled"})._id;
        // console.log(nextActID);
        Acts.update({_id : nextActID}, {$set : {status : "In Progress"}});
    },
    'acts.stopCurrentAct'()
    {
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        let currActID = Acts.findOne({status : "In Progress"})._id;
        Acts.update({_id : currActID} , {$set : {status : "Ended"}});
    },
    'acts.startBids'()
    {
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        let prevActID = Acts.findOne({status : "Ended"})._id;
        Acts.update({_id: prevActID}, {$set : {status : "Bidding"}});
    },
    'acts.stopBids'()
    {
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        let prevActID = Acts.findOne({status : "Bidding"})._id;
        Acts.update({_id: prevActID}, {$set : {status : "Completed"}});
    },
    'acts.updateName'(actID, name)
    {
        check(actID, String);
        check(name, String);
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        Acts.update({_id : actID}, {$set : {name}});
    },
    'acts.updateAuthor'(actID, author)
    {
        check(actID, String);
        check(author, String);
        if(Meteor.user().role !== 1)
        {
            throw new Meteor.Error('not-authorized', "You are not an administrator");
        }
        Acts.update({_id : actID}, {$set : {author}});
    }
});