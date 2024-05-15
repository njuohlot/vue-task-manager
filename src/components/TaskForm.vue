<template>
    
    <form @submit.prevent="handleSubmit">

        <input type="text" placeholder="I need to..." v-model="newTask">
        <button>Add Task</button>
    </form>
</template>

<script>
import { useTaskStore } from '@/store/TaskStore'
import { ref } from 'vue'
   export default{
    name: 'TaskForm',
     setup(){
         const taskStore = useTaskStore()

         const newTask = ref('')

         const handleSubmit = () => {
             if (newTask.value.length > 0) {
                 taskStore.addTask({
                     title: newTask.value,
                     isFav: false,
                     id: Math.floor(Math.random() * 1000000)
                 })
                 alert('Task Added')
                 newTask.value = ""
             }
         }

         return { handleSubmit, newTask }
     }
   }


</script>