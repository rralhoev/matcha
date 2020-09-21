import { fetchAuthClear } from '../actions';

export const FETCH_SIGNUP = 'FETCH_SIGNUP';
export const FETCH_SIGNUP_SUCCESS = 'FETCH_SIGNUP_SUCCESS';
export const FETCH_SIGNUP_FAILED = 'FETCH_SIGNUP_FAILED';
export const FETCH_SIGNUP_CLEAR = 'FETCH_SIGNUP_CLEAR';

export const fetchSignUpAction = (text, success = false) => {
  return {
    type: FETCH_SIGNUP,
    payload: { loading: text, success: success },
  };
};

export const fetchSignUpSuccess = (text, code = 200) => {
  return {
    type: FETCH_SIGNUP_SUCCESS,
  };
};

export const fetchSignUpClear = () => {
  return {
    type: FETCH_SIGNUP_CLEAR,
  };
};

export const fetchSignUpFailed = (text, status = 400) => {
  return {
    type: FETCH_SIGNUP_FAILED,
    payload: { error: text, status: status },
  };
};

export const fetchSignUp = (mail, password, loadingText) => async (
  dispatch
) => {
  dispatch(fetchAuthClear());
  dispatch(fetchSignUpClear());
  dispatch(fetchSignUpAction(loadingText));
  let response = await fetch('http://localhost:3000/user/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mail: mail,
      pass: password,
    }),
  });

  if (response.status === 401) {
    dispatch(fetchSignUpFailed("User don't confirm mail", 401));
  } else if (response.status === 406) {
    dispatch(fetchSignUpFailed('User already exist', 406));
  } else if (response.status !== 201) {
    dispatch(fetchSignUpFailed('Wrong mail or password'));
  } else if (!response.ok) {
    throw Error(response.statusText);
  } else {
    dispatch(fetchSignUpSuccess());
  }
};
