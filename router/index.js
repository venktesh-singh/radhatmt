const router = require('express').Router();
const multer = require('multer');
const path = require('path');

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// controller call
const userController = require('../controller/user');  
const productController = require('../controller/product');
const sliderController = require('../controller/slider');
const corevaluesController = require('../controller/corevalues');
const clientController = require('../controller/client');  
const testimonialController = require('../controller/testimonial');
const technologyController = require('../controller/technology');  
const legacyController = require('../controller/legacy');   
const processController = require('../controller/process');   
const qpmController = require('../controller/qpm');   
const approvalController = require('../controller/approval');   
const homeController = require('../controller/home');

// ************************Route for user**************************
router.post('/user/login', userController.login);
router.get('/user/get_users', userController.getUsers);
router.get('/user/get_user_id/:id', userController.get_user_id);
router.patch('/user/update_user/:id', userController.update_user);
router.delete('/user/delete_user/:id', userController.delete_user);   
router.post('/user/postdata',userController.postdata)     


// ************************ Route for Product **************************
router.post('/product/addproduct', upload.single('product_pic'),upload.array('product_thumbnail', 10),productController.addproduct); 
router.get('/product/getproduct', productController.getProduct); 
router.get('/product/get_product_id/:id', productController.get_product_id); 
router.patch('/product/update_product/:id', productController.update_product);    
router.delete('/product/delete_product/:id', productController.delete_product);  

// ************************ Route for Slider **************************
router.post('/slider/addslider', upload.single('slider_pic','m_slider_pic'), sliderController.addslider); 
router.get('/slider/getslider', sliderController.getslider); 
router.get('/slider/get_slider_id/:id', sliderController.get_slider_id); 
router.patch('/slider/update_slider/:id',  upload.single('slider_pic'), sliderController.update_slider);    
router.delete('/slider/delete_slider/:id', sliderController.delete_slider);  


// ************************ Route for Core Values **************************
router.post('/corevalues/addcorevalues', upload.single('values_pic'), corevaluesController.addcorevalues);   
router.get('/corevalues/getcorevalues', corevaluesController.getcorevalues); 
router.get('/corevalues/get_corevalues_id/:id', corevaluesController.get_corevalues_id); 
router.patch('/corevalues/update_corevalues/:id',  upload.single('values_pic'), corevaluesController.update_corevalues);    
router.delete('/corevalues/delete_corevalues/:id', corevaluesController.delete_corevalues);


// ************************ Route for Client **************************
router.post('/client/addclient', upload.single('client_pic'), clientController.addclient);    
router.get('/client/getclient', clientController.getclient); 
router.get('/client/get_client_id/:id', clientController.get_client_id); 
router.patch('/client/update_client/:id',  upload.single('client_pic'), clientController.update_client);    
router.delete('/client/delete_client/:id', clientController.delete_client); 

 
// ************************ Route for Testimonials **************************
router.post('/testimonial/addtestimonial', upload.single('testimonial_pic'), testimonialController.addtestimonial);    
router.get('/testimonial/gettestimonial', testimonialController.gettestimonial); 
router.get('/testimonial/get_testimonial_id/:id', testimonialController.get_testimonial_id); 
router.patch('/testimonial/update_testimonial/:id',  upload.single('testimonial_pic'), testimonialController.update_testimonial);    
router.delete('/testimonial/delete_testimonial/:id', testimonialController.delete_testimonial); 


// ************************ Route for Technology **************************
router.post('/technology/addtechnology', upload.single('technology_pic'), technologyController.addtechnology);    
router.get('/technology/gettechnology', technologyController.gettechnology); 
router.get('/technology/get_technology_id/:id', technologyController.get_technology_id); 
router.patch('/technology/update_technology/:id',  upload.single('technology_pic'), technologyController.update_technology);    
router.delete('/technology/delete_technology/:id', technologyController.delete_technology); 

// ************************ Route for Legacy **************************
router.post('/legacy/addlegacy', upload.single('legacy_pic'), legacyController.addlegacy);    
router.get('/legacy/getlegacy', legacyController.getlegacy); 
router.get('/legacy/get_legacy_id/:id', legacyController.get_legacy_id); 
router.patch('/legacy/update_legacy/:id',  upload.single('legacy_pic'), legacyController.update_legacy);    
router.delete('/legacy/delete_legacy/:id', legacyController.delete_legacy); 

// ************************ Route for process **************************
router.post('/process/addprocess', upload.single('process_pic'), processController.addprocess);    
router.get('/process/getprocess', processController.getprocess); 
router.get('/process/get_process_id/:id', processController.get_process_id); 
router.patch('/process/update_process/:id',  upload.single('process_pic'), processController.update_process);    
router.delete('/process/delete_process/:id', processController.delete_process); 

// ************************ Route for Quality Process Management **************************
router.post('/qpm/addqpm', upload.single('qpm_pic'), qpmController.addqpm);    
router.get('/qpm/getqpm', qpmController.getqpm); 
router.get('/qpm/get_qpm_id/:id', qpmController.get_qpm_id); 
router.patch('/qpm/update_qpm/:id',  upload.single('qpm_pic'), qpmController.update_qpm);    
router.delete('/qpm/delete_qpm/:id', qpmController.delete_qpm); 


// ************************ Route for Accreditations Approvals **************************
router.post('/approval/addapproval', upload.single('approval_pic'), approvalController.addapproval);    
router.get('/approval/getapproval', approvalController.getapproval); 
router.get('/approval/get_approval_id/:id', approvalController.get_approval_id); 
router.patch('/approval/update_approval/:id',  upload.single('approval_pic'), approvalController.update_approval);    
router.delete('/approval/delete_approval/:id', approvalController.delete_approval); 

// ************************ Route for Home **************************
router.post('/home/addhome', upload.single('home_pic','about_pic'), homeController.addhome);    
router.get('/home/gethome', homeController.gethome); 
router.get('/home/get_home_id/:id', homeController.get_home_id); 
router.patch('/home/update_home/:id',  upload.single('home_pic','about_pic'), homeController.update_home);    
   
module.exports = router;       
              