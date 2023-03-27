import {Router} from 'express';
import AllModules from '../controllers/GestionInicio';

const router:Router = Router()

class RouterInicio extends AllModules{
    public GetModules (){
        router.get('/modules',this.getModules)
        return router;
    }
}

export default RouterInicio;