const selectIsAuthenticated = state => Boolean(state.auth.user);

export { selectIsAuthenticated };
export default selectIsAuthenticated;
