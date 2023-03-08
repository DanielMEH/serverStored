import {Router} from 'express';
const router:Router = Router()

class RouterProviders{
    public GetProviders(){
        router.get('/providers',this.getProviders)
        return router;
    }
    public GetProvidersId(){
        router.get('/providers/:id',this.getProvidersId)
        return router;
    }
    public PostProviders(){
        router.post('/providers',this.postProviders)
        return router;
    }
    public PutProviders(){
        router.put('/providers/:id',this.putProviders)
        return router;
    }
    public DeleteProviders(){
        router.delete('/providers/:id',this.deleteProviders)
        return router;
    }
    public GetProvidersProducts(){
        router.get('/providers/:id/products',this.getProvidersProducts)
        return router;
    }
}


export default RouterProviders;