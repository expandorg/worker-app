// @flow

// eslint-disable-next-line import/prefer-default-export
export const surveyVisible = (user: ?Object) => {
  if (!user) {
    return false;
  }
  return true;
};
