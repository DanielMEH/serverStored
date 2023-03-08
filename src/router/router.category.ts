import {Router} from 'express'
const router:Router = Router()

class RouterCategory{

    public CreateCategory(){
        router.post('/category',this.createCategory)
        return router;
        }

    public GetCategory(){
        router.get('/category',this.getCategory)
        return router;
    }

    public GetCategoryId(){
        router.get('/category/:id',this.getCategoryId)
        return router;

    }

    public PutCategory(){
        router.put('/category/:id',this.putCategory)
        return router;
    }

    public DeleteCategory(){
        router.delete('/category/:id',this.deleteCategory)
        return router;
    }

    public GetCategoryProducts(){
        router.get('/category/products/:id',this.getCategoryProducts)
        return router;
    }

}

export default RouterCategory;