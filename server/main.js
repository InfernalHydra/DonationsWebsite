import { Meteor } from 'meteor/meteor'
import {appId, secret, appIdTest, secretTest} from './keys'
import '../src/api/Users'
import '../src/api/Acts'
import '../src/api/Bids'

Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId : appIdTest,
    secret : secretTest
});
});
