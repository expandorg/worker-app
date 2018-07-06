
export default function entitiesMapReducer(actionTypes, idSelector = action => action.meta.id) {
  return reduce =>
    (state = {}, action) => {
      if (actionTypes.indexOf(action.type) !== -1) {
        const id = idSelector(action);
        return {
          ...state,
          [id]: reduce(state[id], action),
        };
      }
      return state;
    };
}
