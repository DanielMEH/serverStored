import {Router } from 'express';
const router:Router = Router()
import ManageProducts from '../controllers/GestionProductos'


class RouterProducts extends ManageProducts{
   
    public Getproducts(){
    router.get('/getProducts/:_id',this.getProducts );
      return router;    
   }

    public GetproductsId(){
    router.get('/getProductsId/:id',this.getProductsId);
      return router;
    }
    public GetproductsIdCategory(){
    router.get('/productsCategory/:idCategory',this.getProductsIdCategory);
      return router;
    }

    public PostProduct(){
    router.post('/createProducts',this.postProducts);
      return router;
    }

    public PutProducts(){
    router.put('/updateProducts/:id',this.putProducts);
      return router;
    }

    public DeleteProduct(){
    router.delete('/deleteProducts/:id',this.deleteProducts);
      return router;
    }
}

export default RouterProducts;
