import initialMissions from './initialMissions';

const url = 'https://api.spacexdata.com/v3/missions';

// const GET_MISSIONS = 'spacetravelers/GET_MISSIONS';
const GET_MISSIONS_LOADING = 'spacetravelers/GET_MISSIONS_LOADING';
const GET_MISSIONS_FAILURE = 'spacetravelers/GET_MISSIONS_FAILURE';
const GET_MISSIONS_SUCCESS = 'spacetravelers/GET_MISSIONS_SUCCESS';

export const getMissionsLoading = () => ({ type: GET_MISSIONS_LOADING });
export const getMissionsFailure = (errMessage) => ({
  type: GET_MISSIONS_FAILURE,
  payload: errMessage,
});
export const getMissionsSuccess = (missions) => ({
  type: GET_MISSIONS_SUCCESS,
  payload: missions,
});

export const getMissions = () => (dispatch) => {
  dispatch(getMissionsLoading());
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch(getMissionsSuccess(data));
    })
    .catch((err) => {
      dispatch(getMissionsFailure(err.message));
    });
};

const missions = (state = initialMissions, action) => {
  switch (action.type) {
    case GET_MISSIONS_FAILURE:
      return { ...state, errMessage: action.payload };
    case GET_MISSIONS_LOADING:
      return { ...state, loading: true };
    case GET_MISSIONS_SUCCESS:
      return { ...state, missions: action.payload, loading: false };
    default:
      return state;
  }
};

export default missions;
