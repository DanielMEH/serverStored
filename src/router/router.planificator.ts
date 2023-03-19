import {Router} from 'express';
import ManagePlanificator from '../controllers/GestionPlanificator';

const router = Router();

class RoutersPlanificator extends ManagePlanificator {

    public GetPlanificator() {
        router.get('/getPlanificator', this.getPlanificator);
        return router;
    }


 
}

export default RoutersPlanificator;