<template>
  <div id="header-container">
    <input
      type="text"
      class="task-content"
      v-model.lazy.trim="taskContent"
      placeholder="请输入你的待办事项"
      @keyup.enter="addTask"
    />
    <button class="confirm" @click="addTask">confirm</button>
    <button class="cancel" @click="cancel">cancel</button>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "TodoListHeader",
  data() {
    return {
      taskContent: "",
      background: ["#845ec2", "#0081cf", "#4b4453", "#bc39b1", "#ff8066"],
    };
  },
  methods: {
    cancel() {
      this.taskContent = "";
    },
    addTask() {
      if (this.taskContent) {
        const task = {
          id: nanoid(),
          taskContent: this.taskContent,
          background: this.background[Number.parseInt(Math.random() * 5)],
        };
        this.$store.commit("ADDTASK", task);
        this.taskContent = "";
      } else {
        alert("消息内容不能为空");
      }
    },
  },
};
</script>

<style scoped>
.header-container {
  height: 50px;
  display: flex;
  align-items: center;
  animation: move 1s ease;
}
.task-content {
  width: 350px;
  border: none;
  height: 50px;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: 600px;
  letter-spacing: 1px;
  outline: none;
}
button {
  width: 120px;
  height: 40px;
  border-radius: 20px;
  font-weight: 550;
  font-size: 14px;
  letter-spacing: 1px;
  color: white;
  border: none;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  transition: all 0.5s ease;
}

button:hover {
  transform: scale(1.1);
}

.confirm {
  background: rgb(31, 32, 187);
  margin: 0 10px 0 20px;
}
.cancel {
  background: #000000;
  width: 100px;
}
</style>
