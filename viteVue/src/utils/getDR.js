import { useRoute, useRouter } from 'vue-router';

// 获取router和route 
export default function getDR() {
    const router = useRouter()
    const route = useRoute()
    return { router, route }
}