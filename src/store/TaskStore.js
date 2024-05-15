import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
state:() =>({
    task:[],
    loading: false,
    name: 'Lotty Task'
}),
getters: {
    favs(){
     
        return this.task.filter(t => t.isFav)
    },
    favCount() {
      return this.task.reduce((p, c) =>{
        return c.isFav ? p = 1 : p
      }, 0)
    },
    taskCount: (state) => {
       return state.task.length
    }
},
actions:{
    async getTasks() {
        this.loading = true
       // get data from json file using json server
        const res = await fetch('http://localhost:3000/task')
        const data = await res.json()

        this.task = data
        this.loading = false
    },
    async addTask(task) {
        this.task.push(task)
        const res = await fetch('http://localhost:3000/task', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.error) {
            console.log(res.error)
        }
    },
    
    async deleteTask(id) {
        this.task = this.task.filter(t => {
            return t.id !== id
        })

        const res = await fetch('http://localhost:3000/task/' + id, {
            method: 'DELETE',
        })

        if (res.error) {
            console.log(res.error)
        }
    },
     
    async toggleFav(id) {
        const task = this.task.find(t => t.id === id)
        task.isFav = !task.isFav

        const res = await fetch('http://localhost:3000/task/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ isFav: task.isFav }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.error) {
            console.log(res.error)
        }
    }

}
})

