import {
  DID_GET_MESSAGES
} from '../action_types.js';


export const fetchMessages = username => {
  return {
    type: DID_GET_MESSAGES,
    payload: null
  };
};