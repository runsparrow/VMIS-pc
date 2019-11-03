import { getvenuelist, addvenue,updatevenue,delvenue } from '../services/venue'
import { message } from 'antd';

const venueModel = {
    namespace: 'venuemanagement',
    state: {
        venuelist: [],
    },
    effects: {
        *getvenuelist({ payload }, { call, put }) {
            const response = yield call(getvenuelist, payload);
            if (response && response.error == null) {
                yield put({
                    type: 'savevenuelist',
                    payload: response
                });
            }
        },
        *addvenue({ payload }, { call, put }) {
            const response = yield call(addvenue, payload);
            if (response && !response.Exception) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
        },
        // // *getuser({ payload }, { call, put }) {
        // //     const response = yield call(getuser, payload);

        // // },
        *updatevenue({ payload }, { call, put }) {
            const response = yield call(updatevenue, payload);
            if (response && !response.Exception) {
                message.success("更新成功")
            } else {
                message.error("更新失败")
            }
        },
        *delvenue({ payload }, { call, put }) {
            const response = yield call(delvenue, payload);
            if (response && !response.Exception) {
                message.success("删除成功")
            } else {
                message.error("删除失败")
            }
        },
    },
    reducers: {
        savevenuelist(state, action) {
            return { ...state, venuelist: action.payload };
        },

    },
};
export default venueModel;
