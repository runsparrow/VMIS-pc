import { gettasklist, addtask, updatetask, deltask } from '../services/task'
import { message } from 'antd';

const taskModel = {
    namespace: 'taskmanagement',
    state: {
        tasklist: [],
    },
    effects: {
        *gettasklist({payload}, { call, put }) {
            const response = yield call(gettasklist, payload);
            if (response && response.error == null) {
                yield put({
                    type: 'savetasklist',
                    payload: response
                });
            }
        },
        *addtask({ payload }, { call, put }) {
            const response = yield call(addtask, payload);
            if (response && !response.Exception) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
        },
        *updatetask({ payload }, { call, put }) {
            const response = yield call(updatetask, payload);
            if (response && !response.Exception) {
                message.success("更新成功")
            } else {
                message.error("更新失败")
            }
        },
        *deltask({ payload }, { call, put }) {
            const response = yield call(deltask, payload);
            if (response && !response.Exception) {
                message.success("删除成功")
            } else {
                message.error("删除失败")
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
