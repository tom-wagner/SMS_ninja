// export reducers here, ex:

// export function itemsHasErrored(state = false, action) {
//   switch (action.type) {
//       case 'ITEMS_HAS_ERRORED':
//           return action.hasErrored;
//       default:
//           return state;
//   }
// }
// export function itemsIsLoading(state = false, action) {
//   switch (action.type) {
//       case 'ITEMS_IS_LOADING':
//           return action.isLoading;
//       default:
//           return state;
//   }
// }
// export function items(state = [], action) {
//   switch (action.type) {
//       case 'ITEMS_FETCH_DATA_SUCCESS':
//           return action.items;
//       default:
//           return state;
//   }
// }

export function username(state = '', action) {
  return state;
}

export function phoneNumber(state = '', action) {
  return state;
}

export function isLoggedIn(state = false, action) {
  return state;
}

export function scheduledMessages(state = [], action) {
  return state;
}

export function previouslySentMessages(state = [], action) {
  return state;
}

export function view(state = 'login', action) {
  return state;
}