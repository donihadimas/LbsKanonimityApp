export const updateLoggedStatus = (values: any, loginStatus: Boolean) => {
  let updatedStatus: any = {...values};
  if (updatedStatus) {
    updatedStatus.loggedIn = loginStatus;
    return updatedStatus;
  }
};
