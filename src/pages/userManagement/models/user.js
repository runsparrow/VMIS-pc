import { getuserlist, adduser, unbind ,updateuser,deluser} from '../services/user'
import { message } from 'antd';

const UserModel = {
    namespace: 'usermanagement',
    state: {
        userlist: [],
    },
    effects: {
        *getuserlist(_, { call, put }) {
            const response = yield call(getuserlist);
            if (response && response.error == null) {
                yield put({
                    type: 'saveuserlist',
                    payload:response
                });
            }

        },
        *adduser({ payload }, { call, put }) {
            const response = yield call(adduser, payload);
            if (response && !response.Exception) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
        },
        // *getuser({ payload }, { call, put }) {
        //     const response = yield call(getuser, payload);

        // },
        *updateuser({ payload }, { call, put }) {
            const response = yield call(updateuser, payload);
            if (response && !response.Exception) {
                message.success("更新成功")
            } else {
                message.error("更新失败")
            }
        },
        *deluser({ payload }, { call, put }) {
            const response = yield call(deluser, payload);
            if (response && !response.Exception) {
                message.success("删除成功")
            } else {
                message.error("删除失败")
            }
        },
        *unbind({ payload }, { call, put }) {
            const response = yield call(unbind, payload);
            if (response && !response.Exception) {
                message.success("解绑成功")
            } else {
                message.error("解绑失败")
            }
        },
    },
    reducers: {
        saveuserlist(state, action) {
            return { ...state, userlist: action.payload };
        },
        // saveCurrentUser(state, action) {
        //   return { ...state, currentUser: action.payload || {} };
        // },

        // changeNotifyCount(
        //   state = {
        //     currentUser: {},
        //   },
        //   action,
        // ) {
        //   return {
        //     ...state,
        //     currentUser: {
        //       ...state.currentUser,
        //       notifyCount: action.payload.totalCount,
        //       unreadCount: action.payload.unreadCount,
        //     },
        //   };
        // },
    },
};
export default UserModel;
