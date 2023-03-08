import {Router } from 'express';
const router:Router = Router()
import ManageProducts from '../controllers/GestionProductos'


class RouterProducts extends ManageProducts{
   
    public Getproducts(){
    router.get('/products',this.getProducts );
      return router;    
   }

    public GetproductsId(){
    router.get('/products/:id',this.getProductsId);
      return router;
    }

    public GetproductsIdCategory(){
    router.get('/products/category/:id',this.getProductsIdCategory);
      return router;
    }

    public PostProduct(){
    router.post('/products',this.postProducts);
      return router;
    }

    public PutProduct(){
    router.put('/products/:id',this.putProducts);
      return router;
    }

    public DeleteProduct(){
    router.delete('/products/:id',this.deleteProducts);
      return router;
    }
}


export default RouterProducts;
