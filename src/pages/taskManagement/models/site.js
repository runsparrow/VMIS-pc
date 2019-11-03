import { getsitelist, getvenuelist } from '../services/site'
import { message } from 'antd';

const VenueSiteModel = {
    namespace: 'venuesite',
    state: {
        sitelist: [],
        venuelist:[]
    },
    effects: {
        *getsitelist(_, { call, put }) {
            const response = yield call(getsitelist);
            if (response && response.error == null) {
                console.log("response",response)
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
                    payload: {
                        list: response.rows
                    },
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
    },
};
export default VenueSiteModel;
