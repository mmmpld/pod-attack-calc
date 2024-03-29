import Main from '@/components/Main.vue'

export default [
  {
    path: '/pod-attack-calc/',
    component: Main,
    props: route => ({ ...route.query })
  },
  { path: '/:pathMatch(.*)*', redirect: '/pod-attack-calc/' }
]
