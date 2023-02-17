import { ref, computed } from "vue";
export default function useTodos() {
    let title = ref("");
    let todos = ref([{ title: '学习Vue', done: false }])
    function addTodo() {
        todos.value.push({ title: title.value, done: false, });
        title.value = "";
    }
    function clear() {
        todos.value = todos.value.filter(v => !v.done)
    }

    let active = computed(() => todos.value.filter(v => !v.done).length);
    let all = computed(() => todos.value.length)
    let allDone = computed({
        get() {
            return active.value === 0
        },
        set(value) {
            todos.value.forEach((item) => {
                item.done = value
            })
        }
    })
    return { title, todos, addTodo, clear, active, all, allDone };
}