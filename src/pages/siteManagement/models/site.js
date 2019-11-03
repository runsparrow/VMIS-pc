import { getsitelist, addsite, updatesite, delsite } from '../services/site'
import { message } from 'antd';

const SiteModel = {
    namespace: 'sitemanagement',
    state: {
        sitelist: [],
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
        *addsite({ payload }, { call, put }) {
            const response = yield call(addsite, payload);
            if (response && !response.Exception) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
        },
        // // *getuser({ payload }, { call, put }) {
        // //     const response = yield call(getuser, payload);

        // // },
        *updatesite({ payload }, { call, put }) {
            const response = yield call(updatesite, payload);
            if (response && !response.Exception) {
                message.success("更新成功")
            } else {
                message.error("更新失败")
            }
        },
        *delsite({ payload }, { call, put }) {
            const response = yield call(delsite, payload);
            if (response && !response.Exception) {
                message.success("删除成功")
            } else {
                message.error("删除失败")
            }
        },
    },
    reducers: {
        savesitelist(state, action) {
            return { ...state, sitelist: action.payload };
        },

    },
};
export default SiteModel;
