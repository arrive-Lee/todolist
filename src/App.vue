<template>
  <div id="app">
    <TodoListHeader
      class="header animate__animated animate__fadeIn"
    ></TodoListHeader>
    <TodoListMain
      class="main header animate__animated animate__fadeIn"
    ></TodoListMain>
  </div>
</template>

<script>
import TodoListHeader from "./components/TodoListHeader.vue";
import TodoListMain from "./components/TodoListMain.vue";
export default {
  name: "App",
  components: {
    TodoListHeader,
    TodoListMain,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  overflow: auto;
  height: 100vh;
}
.header {
  margin: 50px 0 0 70px;
}
.main {
  margin-left: 70px;
}
</style>
