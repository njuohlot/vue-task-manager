<template>
  <main>
    <!---heading-->
    <header>

      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">

      <h1>{{ useTask.name }}</h1>

    </header>
    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!--filter-->
    <nav class="filter">
      <button @click="filter = 'all'">All Task</button>
      <button @click="filter = 'favs'">Favorite Task</button>

    </nav>
    <!-- loading -->
    <div class="loading" v-if="useTask.loading">Loading tasks...</div>

    <!---task list-->
    <div class="task-list" v-if="filter === 'all'">
      <p>All Tasks ({{ useTask.taskCount }})</p>
      <div v-for="task in useTask.task" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>


    <!--fav task list-->
    <div class="task-list" v-if="filter === 'favs'">
      <p>Fav Tasks ({{ useTask.favCount }})</p>
      <div v-for="task in useTask.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <button @click="useTask.$reset">Reset Task</button>
  </main>
</template>

<script>
import { ref } from 'vue';
import TaskDetails from './components/TaskDetails.vue';
import { useTaskStore } from './store/TaskStore';
import TaskForm from './components/TaskForm.vue';


export default {
  components:{
    TaskDetails,
    TaskForm 
  },
  setup(){
    const useTask = useTaskStore();
    // fetch tasks
    useTask.getTasks()
    const filter = ref('all');

    return{useTask, filter}
  }
}
</script>
