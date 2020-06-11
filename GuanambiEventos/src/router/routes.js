
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'favorites', component: () => import('pages/Favorites.vue') },


    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue') },
      
    ]
  },

  {
    path: '/options',
    component: () => import('layouts/OptionsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/OptionsEventEspace.vue') }
    ]
  },

  {
    path: '/list',
    component: () => import('layouts/ListEventsLayout.vue'),
    children: [
      { path: 'all', component: () => import('pages/ListAll.vue') },
      { path: 'day', component: () => import('pages/ListDay.vue') },
      { path: 'month', component: () => import('pages/ListMonth.vue') }

    ]
  },

  {
    path: '/listCategories',
    component: () => import('layouts/ListEventsCategoriesLayout.vue'),
    children: [
      { path: 'all', name: 'allName', component: () => import('pages/ListAll.vue') },
      { path: 'day', component: () => import('pages/ListDay.vue') },
      { path: 'month', component: () => import('pages/ListMonth.vue') }

    ]
  },


]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
