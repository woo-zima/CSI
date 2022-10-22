import router from ".";
import {routerStore} from '@/store'


//白名单，不进行拦截处理
const whiteList = ['/login', '/register'];

router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('jwt');
    // console.log(to);
    const store = routerStore()
    if (token) {
      if (to.path === '/login') {
        next()
      } 
      else{
        const hasRoles = store.getUser && store.getUser.name
        if(hasRoles){
            next()
        }else{
          try{
            // const roles = store.getUser.name
           const accessRoutes = await store.GenerateRoutes();
           if(accessRoutes)(
           accessRoutes.forEach((route:any)=>{
            router.addRoute(route)
            
           })
           )
           next({...to,replace:true})
          }catch{
            next(`/login`)
          }

        }
       
      }
    } else {
      if(whiteList.indexOf(to.path) != -1){
        next()
      }
      else{
        next(`/login`)
      }
     
    }
  });