import { getcustomerlist, addcustomer, getcustomer ,updatecustomer,delcustomer} from '../services/customer'
import { message } from 'antd';

const customerModel = {
    namespace: 'customermanagement',
    state: {
        customerlist: [],
    },
    effects: {
        *getcustomerlist(_, { call, put }) {
            const response = yield call(getcustomerlist);
            if (response && response.error == null) {
                yield put({
                    type: 'savecustomerlist',
                    payload: response
                });
            }
        },
        *addcustomer({ payload }, { call, put }) {
            const response = yield call(addcustomer, payload);
            if (response && !response.Exception) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
        },
        // *getcustomer({ payload }, { call, put }) {
        //     const response = yield call(getcustomer, payload);

        // },
        *updatecustomer({ payload }, { call, put }) {
            const response = yield call(updatecustomer, payload);
            if (response && !response.Exception) {
                message.success("更新成功")
            } else {
                message.error("更新失败")
            }
        },
        *delcustomer({ payload }, { call, put }) {
            const response = yield call(delcustomer, payload);
            if (response && !response.Exception) {
                message.success("删除成功")
            } else {
                message.error("删除失败")
            }
        },
    },
    reducers: {
        savecustomerlist(state, action) {
            return { ...state, customerlist: action.payload };
        },
        // saveCurrentcustomer(state, action) {
        //   return { ...state, currentcustomer: action.payload || {} };
        // },

        // changeNotifyCount(
        //   state = {
        //     currentcustomer: {},
        //   },
        //   action,
        // ) {
        //   return {
        //     ...state,
        //     currentcustomer: {
        //       ...state.currentcustomer,
        //       notifyCount: action.payload.totalCount,
        //       unreadCount: action.payload.unreadCount,
        //     },
        //   };
        // },
    },
};
export default customerModel;
