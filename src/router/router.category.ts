import {Router} from 'express'
const router:Router = Router()
import Categorys from '../controllers/GestionCategory'

class RouterCategory extends Categorys{

    public CreateCategory(){
        router.post('/category',this.createCategory)
        return router;
        }

    public GetCategory(){
        router.get('/category/:id',this.getCategory)
        return router;
    }

    public GetCategoryId(){
        router.get('/category/:_id',this.getCategoryId)
        return router;

    }

    public PutCategory(){
        router.put('/category/:_id',this.putCategory)
        return router;
    }

    public DeleteCategory(){
        router.delete('/category/:_id',this.deleteCategory)
        return router;
    }

    public GetCategoryProducts(){
        router.get('/category/products/:id',this.getCategoryProducts)
        return router;
    }

}

export default RouterCategory;