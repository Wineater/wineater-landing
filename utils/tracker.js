import Tracker from '@openreplay/tracker';
import {v4 as uuidV4} from 'uuid'

function defaultGetUserId() {
  return uuidV4()
}

export function startTracker(config) {

  console.log("Starting tracker...")

  const getUserId = (config?.userIdEnabled && config?.getUserId) ? config.getUserId : defaultGetUserId
  let userId = null;

  const trackerConfig = {
    projectKey: 'XkscRWp9UTyrXtkhPbQV'
  }

  const tracker = new Tracker(trackerConfig);

  if(config?.userIdEnabled) {
    userId = getUserId()
    tracker.setUserID(userId)
  }

  tracker.start();
  return {
    tracker,
    userId
  }
}
