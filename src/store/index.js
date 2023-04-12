import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const actions = {
  //删除已完成的任务
  deleteUnfinishTask(context, value) {
    //异步提交，让动画播放完
    setTimeout(() => {
      context.commit("DELETEUNFINISHTASK", value);
    }, 500);
  },
  //删除已完成的任务
  deletefinishTask(context, value) {
    //异步提交，让动画播放完
    setTimeout(() => {
      context.commit("DELETEFINISHTASK", value);
    }, 500);
  },
};

const mutations = {
  //添加未完成任务
  ADDTASK(state, value) {
    state.unfinishTask.push(value);
  },
  //将未完成的任务设置为完成
  SETFINISHED(state, value) {
    const task = state.unfinishTask[value];
    state.unfinishTask.splice(value, 1);
    state.finishTask.push(task);
  },
  //将完成的任务设置未完成
  SETUNFINISHED(state, value) {
    const task = state.finishTask[value];
    state.finishTask.splice(value, 1);
    state.unfinishTask.push(task);
  },

  //删除未完成的任务
  DELETEUNFINISHTASK(state, value) {
    state.unfinishTask.splice(value, 1);
  },
  //删除已完成的任务
  DELETEFINISHTASK(state, value) {
    state.finishTask.splice(value, 1);
  },
  //修改已完成任务的背景颜色
  //value为一个数组，0号为索引，1号为颜色
  CHANGECOLOR(state, value) {
    const [index, color] = value;
    state.unfinishTask[index].background = color;
  },
};

const state = {
  finishTask: JSON.parse(localStorage.getItem("finish")) || [],
  unfinishTask: JSON.parse(localStorage.getItem("unfinish")) || [],
};

const getters = {
  finishTaskNumber(state) {
    return state.finishTask.length;
  },
  unfinishTaskNumber(state) {
    return state.unfinishTask.length;
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
