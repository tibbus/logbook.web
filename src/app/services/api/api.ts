// SWITCH the FAKE service from here :
const fakeServiceEnabled = true;

const API = {
    fakeServiceEnabled: null,
    /* **DEV** Enviroment */
    root: 'http://mycarbioservice.azurewebsites.net/api/v1',

    userCars: '/usercar/details=true',
    carInfo: '/car/{id}/details',
    userRegisterCar: '/usercar/registration/',
    userRemoveCar: '/usercar/',
    user: '/user/',
    timeline: '/timeline/',
    post: '/car/',
    search: 'https://mycarbiosearch.search.windows.net/indexes/carinfostaging/docs?api-version=2015-02-28&search=',
    token: '/feeds/token',
    follow: '/follow/',
    unFollow: '/unfollow/',
    comment: '/comment',
    carImage: '/car/{id}/profile/image'
}

// SWITCH the FAKE service from here :
API.fakeServiceEnabled = false;

if (API.fakeServiceEnabled) {
    API.root = `${window.location.origin}/api/v1`;

    API.search = '/search?';
}

export  { API };