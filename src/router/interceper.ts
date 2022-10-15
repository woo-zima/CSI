import router from ".";
import {routerStore} from '@/store'

router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('userInfo');
    console.log(to);
    const store = routerStore()
    if (to.meta.Auth) {
      console.log("Auth");
      
        store.GenerateRoutes().then(res =>{
            console.log(res);
            
        })
        next(); 
    //   if (token) {

    //     next();
    //   } else {
    //     next({
    //       path: '/',
    //     });
    //   }
    } else {
      next();
    }
  });