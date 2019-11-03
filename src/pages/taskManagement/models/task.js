import { gettasklist, addtask,updatetask,deltask } from '../services/task'
import { message } from 'antd';

const taskModel = {
    namespace: 'taskmanagement',
    state: {
        tasklist: [],
    },
    effects: {
        *gettasklist(_, { call, put }) {
            const response = yield call(gettasklist);
            if (response && response.error == null) {
                yield put({
                    type: 'savetasklist',
                    payload:response
                });
            }
        },

    },
    reducers: {
        savetasklist(state, action) {
            return { ...state, tasklist: action.payload };
        },

    },
};
export default taskModel;
