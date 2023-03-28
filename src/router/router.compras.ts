import {Router} from 'express';
import ManageCompras from '../controllers/GestionCompras';

const router = Router();

class RoutersCompras extends ManageCompras {

    public GetCompras() {
        router.get('/getCompras', this.getCompras);
        return router;
    }
}

export default RoutersCompras;