import * as profilesAPI from './profiles-api';

export async function getProfile(userId) {
  return profilesAPI.getProfile(userId);
}