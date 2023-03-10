import {Router } from 'express';
const router:Router = Router()
import ManageProducts from '../controllers/GestionProductos'


class RouterProducts extends ManageProducts{
   
    public Getproducts(){
    router.get('/getProducts',this.getProducts );
      return router;    
   }

    public GetproductsId(){
    router.get('/getProducts/:id',this.getProductsId);
      return router;
    }
    public GetproductsIdCategory(){
    router.get('/productsCategory/:id',this.getProductsIdCategory);
      return router;
    }

    public PostProduct(){
    router.post('/createProducts',this.postProducts);
      return router;
    }

    public PutProduct(){
    router.put('updatProducts/:id',this.putProducts);
      return router;
    }

    public DeleteProduct(){
    router.delete('/deleteProducts/:id',this.deleteProducts);
      return router;
    }
}


export default RouterProducts;
