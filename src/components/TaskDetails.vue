<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <span class="material-icons delete" @click="taskStore.deleteTask(task.id)">delete</span>
            <span class="material-icons fav" :class="{active: task.isFav}" @click="taskStore.toggleFav(task.id)">favorite</span>
        </div>
    </div>

</template>

<script>
import { useTaskStore } from '@/store/TaskStore'

export default{
    name: 'TaskDetails',
    props:{
        task: {},
    },

    setup(){
        const taskStore = useTaskStore()


        return{taskStore}
    }
    
}

</script>