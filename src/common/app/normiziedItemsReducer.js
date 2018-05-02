const normalizedItemsReducer = entityName => (state = {}, action) => {
  if (action.payload) {
    const { entities } = action.payload;
    if (entities && entities[entityName]) {
      return { ...state, ...entities[entityName] };
    }
  }
  return state;
};

export default normalizedItemsReducer;
