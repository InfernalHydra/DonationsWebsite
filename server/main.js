import { Meteor } from 'meteor/meteor';
import '../src/api/Users';
import '../src/api/Acts'

Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '255086912026750',
    secret: '0919cc58f0e1c2e02a3ef45e2b2f575e'
});
});
