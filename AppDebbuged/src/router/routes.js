
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'loading', component: () => import('pages/LoadingData.vue') },

    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'loading', component: () => import('pages/LoadingData.vue') }
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
      { path: 'all', name: 'allName', component: () => import('pages/ListAllCategorie.vue') },
      { path: 'day', component: () => import('pages/ListTodayCategorie.vue') },
      { path: 'month', component: () => import('pages/ListMonthCategorie.vue') }

    ]
  },

  {
    path: '/favorites',
    component: () => import('layouts/FavoritesLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ListFavorites.vue') },

    ]
  },

  {
    path: '/myEvents',
    component: () => import('layouts/MyEventsLayout.vue'),
    children: [
      { path: 'next', component: () => import('pages/MyEventsNext.vue') },
      { path: 'past', component: () => import('pages/MyEventsPast.vue') },


    ]
  },

  {
    path: '/newEvent',
    component: () => import('layouts/NewEventLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NewEvent.vue') },


    ]
  },

  {
    path: '/myProfile',
    component: () => import('layouts/MyProfileLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MyProfile.vue') },


    ]
  },

  {
    path: '/settings',
    component: () => import('layouts/ConfigLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Config.vue') },


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
