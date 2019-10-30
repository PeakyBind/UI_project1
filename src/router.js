import Vue from 'vue';
import Router from 'vue-router';
import setAuth from "./middlewares/setAuth";
import checkAuth from "./middlewares/checkAuth";
import Default from './templates/default';
import UserProfile from './components/pages/userProfile';
import IndexTrainings from './components/pages/indexTrainings';
import ShowTutorial from './components/pages/showTutorial';
import Admin from './templates/admin';
import AdminUsers from './components/admin/pages/Users';
import AdminCategories from './components/admin/pages/Categories';
import AdminTrainings from './components/admin/pages/Trainings';
import AdminTutorials from './components/admin/pages/Tutorials';
import AdminArticles from './components/admin/pages/Articles';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Default,
      beforeEnter: checkAuth,
      children: [
        {
          path: '',
          name: 'home'
        },
        {
          path: '/formations',
          name: 'trainings',
          component: IndexTrainings
        },
        {
          path: '/tutoriel/:id',
          name: 'showTutorial',
          component: ShowTutorial
        },
        {
          path: '/profil/:id',
          name: 'userProfile',
          component: UserProfile
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'users',
          name: 'adminUsers',
          component: AdminUsers
        },
        {
          path: 'categories',
          name: 'adminCategories',
          component: AdminCategories
        },
        {
          path: 'trainings',
          name: 'adminTrainings',
          component: AdminTrainings
        },
        {
          path: 'tutorials',
          name: 'adminTutorials',
          component: AdminTutorials
        },
        {
          path: 'articles',
          name: 'adminArticles',
          component: AdminArticles
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  setAuth();
  next();
});

export default router;

