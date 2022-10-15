import router from ".";
import {routerStore} from '@/store'

router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('userInfo');
    // console.log(to);
    const store = routerStore()
    if (to.meta.Auth) {

        store.GenerateRoutes().then((accessRoutes:any) =>{
            // console.log(router);
            accessRoutes.forEach((route:any)=>{
              console.log(route);
              
              router.addRoute(route)

            })
            
            console.log(router);
            return to.fullPath
        
            
            
        }).catch((err)=>{
 
          next({
                  path: '/',
                });
      
     

        })
       
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