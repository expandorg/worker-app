// @flow
export function isTaskAssignment(assignment: ?Object): boolean {
  if (!assignment) {
    return false;
  }
  return assignment.responseId === null || assignment.responseId === undefined;
}

export function isVerificationAssignment(assignment: ?Object) {
  if (!assignment) {
    return false;
  }
  return assignment.responseId !== null && assignment.responseId !== undefined;
}
