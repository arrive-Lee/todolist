<template>
  <div id="main-container">
    <div class="main-content">
      <h3 class="title">
        待办事项<span class="task-number">{{ unfinishTaskNumber }}</span>
      </h3>
      <ul class="task-list unfinish">
        <li
          v-for="(task, index) in unfinishTask"
          :key="task.id"
          class="task animate__animated animate__backInLeft"
        >
          <textarea
            v-model.lazy="task.taskContent"
            @blur="setDisabled(index)"
            class="task-content"
            :style="{ background: task.background }"
            disabled
          ></textarea>
          <div class="choice-bg">
            <ul class="color-list">
              <li class="color" @click="changeColor([index, '#845ec2'])"></li>
              <li class="color" @click="changeColor([index, '#845ec2'])"></li>
              <li class="color" @click="changeColor([index, '#4b4453'])"></li>
              <li class="color" @click="changeColor([index, '#bc39b1'])"></li>
              <li class="color" @click="changeColor([index, '#ff8066'])"></li>
            </ul>
          </div>
          <div class="function-area">
            <span class="iconfont setfinished" @click="setfinished(index)"
              >&#xeaf1;</span
            >
            <span class="iconfont delete" @click="deleteUnfinishTask(index)"
              >&#xe718;
            </span>
            <span class="iconfont changebg" @click="appear(index)"
              >&#xe634;
            </span>
            <span class="iconfont edit" @click="edit(index)">&#xf014f; </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <h3 class="title">
        已完成<span class="task-number">{{ finishTaskNumber }}</span>
      </h3>
      <ul class="task-list finish">
        <li
          v-for="(task, index) in finishTask"
          :key="task.id"
          class="task animate__animated animate__backInLeft"
        >
          <textarea
            v-model.lazy="task.taskContent"
            class="task-content"
            :style="{ background: task.background }"
            disabled
          ></textarea>
          <div class="function-area">
            <span class="iconfont delete" @click="deletefinishTask(index)"
              >&#xe718;
            </span>
            <span class="iconfont set-unfinished" @click="setUnfinished(index)"
              >&#xe649;</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "TodoListMain",
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setfinished: "SETFINISHED",
      setUnfinished: "SETUNFINISHED",
    }),

    //公共逻辑切换动画
    changeAnimate(index, css) {
      const node = document.querySelector(css).children[index];
      //切换动画
      node.classList.remove("animate__backInLeft");
      node.classList.add("animate__backOutRight");
    },
    //删除已完成的任务
    deleteUnfinishTask(index) {
      this.changeAnimate(index, ".unfinish");
      //提交删除请求
      this.$store.dispatch("deleteUnfinishTask", index);
    },
    //删除已完成的任务
    deletefinishTask(index) {
      this.changeAnimate(index, ".finish");
      this.$store.dispatch("deletefinishTask", index);
    },
    //激活颜色选项卡
    appear(index) {
      //激活颜色选项卡
      const node = document.querySelector(".unfinish").children[index];
      const bg = node.children[1];
      const { style } = bg;
      style.opacity = "1";
      style.zIndex = "1";
    },
    //修改背景颜色
    changeColor(value) {
      this.$store.commit("CHANGECOLOR", value);
      //关闭选项卡
      const node = document.querySelector(".unfinish").children[value[0]];
      const bg = node.children[1];
      const { style } = bg;
      style.opacity = "0";
      style.zIndex = "-1";
    },
    //编辑任务内容
    edit(index) {
      const node = document.querySelector(".unfinish").children[index];
      const content = node.children[0];
      content.removeAttribute("disabled");
      content.focus();
    },
    //当编辑区域失焦过后使其禁止编辑
    setDisable(index) {
      const node = document.querySelector(".unfinish").children[index];
      const content = node.children[0];
      content.setAttribute("disabled", true);
    },
  },
  computed: {
    //从vuex读取数据
    ...mapState(["finishTask", "unfinishTask"]),
    ...mapGetters(["finishTaskNumber", "unfinishTaskNumber"]),
  },
  watch: {
    //监测unfinishTask，变化便将其存入本地浏览器
    unfinishTask: {
      deep: true,
      handler(newVal) {
        //基于浏览器本地储存
        localStorage.setItem("unfinish", JSON.stringify(newVal));
      },
    },
  },
  //监测finishTask，变化便将其存入本地浏览器
  finishTask: {
    deep: true,
    handler(newVal) {
      //基于浏览器本地储存
      localStorage.setItem("finish", JSON.stringify(newVal));
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont";
  src: url("/public/font/iconfont.ttf") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 8px;
  color: white;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  z-index: 1;
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #161618;
  border-radius: 50%;
  transition: all 0.5s ease;
  margin: 0 5px;
  cursor: pointer;
}

.iconfont:hover {
  background-color: white;
  color: #161618;
}

.main-content {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 22px;
}

.task-number {
  margin-left: 50px;
  font-size: 20px;
  vertical-align: middle;
  color: rgb(198, 198, 198);
}

.task-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.task {
  position: relative;
  margin-right: 20px;
  transition: all 0.5s ease;
}

.task-content {
  resize: none;
  height: 250px;
  width: 250px;
  color: #000;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  padding: 30px 20px;
  font-weight: 550;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: all 0.5s ease;
  background-color: #845ec2;
}

.function-area {
  display: flex;
  width: 250px;
  height: 30px;
  position: absolute;
  bottom: 10px;
  justify-content: flex-start;
  transition: all 1s ease;
  opacity: 0;
}

.choice-bg {
  position: absolute;
  bottom: 45px;
  right: 8px;
  opacity: 0;
  z-index: -1;
  transition: all 0.5s ease;
}

.color-list {
  display: flex;
}

.color-list .color {
  border: 2px solid #000;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 5px;
  transition: all 0.5s ease;
}

.color-list .color:hover {
  transform: scale(1.5);
}
.color-list .color:nth-child(1) {
  background: #845ec2;
}
.color-list .color:nth-child(2) {
  background: #0081cf;
}
.color-list .color:nth-child(3) {
  background: #4b4453;
}
.color-list .color:nth-child(4) {
  background: #bc39b1;
}
.color-list .color:nth-child(5) {
  background: #ff8066;
}

.task:hover .function-area {
  opacity: 1;
}

.setfinished {
  font-weight: 700;
  margin: 0 80px 0 10px;
}

.delete {
  font-weight: 550;
}

.changebg {
  font-size: 16px;
}
.main-content:last-child {
  margin-top: 40px;
}

.finish .function-area {
  justify-content: flex-end;
}
.finish .task .task-content {
  height: 150px;
}
.set-unfinished {
  font-size: 16px;
  margin-right: 12px;
}
</style>
