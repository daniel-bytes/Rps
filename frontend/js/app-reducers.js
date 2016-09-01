import dummyData from './dummy-data';

function rpsApp(state, action) {
    if (typeof state === 'undefined') {
        return dummyData;
    }

    return state;
}

export default rpsApp;