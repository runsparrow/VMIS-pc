import { getsitelist, getvenuelist,getcustomerlist } from '../services/site'
import { message } from 'antd';

const VenueSiteModel = {
    namespace: 'venuesite',
    state: {
        sitelist: [],
        venuelist:[],
        customerlist:[]
    },
    effects: {
        *getsitelist(_, { call, put }) {
            const response = yield call(getsitelist);
            if (response && response.error == null) {
                yield put({
                    type: 'savesitelist',
                    payload: response
                });
            }
        },
        *getvenuelist({ payload }, { call, put }) {
            const response = yield call(getvenuelist, payload);
            if (response && response.error == null) {
                yield put({
                    type: 'savevenuelist',
                    payload: response
                });
            }
        },
        *getcustomerlist(_, { call, put }) {
            const response = yield call(getcustomerlist);
            if (response && response.error == null) {
                yield put({
                    type: 'savecustomerlist',
                    payload: response
                });
            }
        },
    },
    reducers: {
        savesitelist(state, action) {
            return { ...state, sitelist: action.payload };
        },
        savevenuelist(state, action) {
            return { ...state, venuelist: action.payload };
        },
        savecustomerlist(state, action) {
            return { ...state, customerlist: action.payload };
        },
    },
};
export default VenueSiteModel;
