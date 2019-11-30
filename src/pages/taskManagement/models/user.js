import { getuserlist} from '../services/user'

const UserModel = {
    namespace: 'taskuser',
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

        }
    },
    reducers: {
        saveuserlist(state, action) {
            return { ...state, userlist: action.payload };
        },
    },
};
export default UserModel;
