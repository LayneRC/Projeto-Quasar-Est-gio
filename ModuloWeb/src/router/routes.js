const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
          {
        path: 'events',
        component: () => import('pages/Events.vue'),
        children: [
          { path: '', component: () => import('pages/PendentEvents.vue') },
          { path: 'pendent', component: () => import('pages/PendentEvents.vue') },
          { path: 'approved', component: () => import('pages/ApprovedEvents.vue') },
          { path: 'reproved', component: () => import('pages/ReprovedEvents.vue') },
         
        ]
      },
      { path: 'users', component: () => import('pages/Users.vue'), },
      {path: 'myEvents', 
        component: () => import('pages/MyEvents.vue'),
        children: [
          {path: 'past', component: () => import('pages/MyPastEvents')}
        ]
      },
      {path: 'newEvents', component: () => import('pages/NewEvents.vue')},


    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
