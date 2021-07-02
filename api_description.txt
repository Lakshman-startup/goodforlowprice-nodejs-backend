## Project food2swap

base_endpoint = https://food2swap.herokuapp.com/api

*********************************

=> Authentication

1) Register New User

@route : /auth/register
@method : POST
@body : {
    email, 
    phone,
     password, 
     name, 
     role : "user" , "business" , "admin"
}

-> donot show admin role to normal app admin role is only for admin app



2) Login through username & password

@route : /auth/login_with_username
@method : POST
@body : {
    username:"email or phone"  
    password, 
    
}



3) Login through phone otp

@route : /auth/login_with_phone_otp
@method : POST
@body : {
    phone  
     
}



4) Fetch current user 

@route : /auth/me
@method : GET
@headers:{
    Authorization : Bearer "token"
}



5)  Verify phone otp

@route : /auth/verify_phone_otp
@method : POST
@body:{
    otp
    userId
}


6) change password

@route : /auth/:userId/change_password
@method : PATCH
@params : userId
@headers : {
    Authorization : Bearer token
}
@body : {
    newPassword:String,
    oldPassword:String
}


7)  send otp

@route :  /auth/send_otp
@method:POST
@body:{
    phone
}



8) reset password

@route :  /auth/reset_password
@method:POST
@body:{
    newPassword,
    userId 
}


---------------------------------------------------------------------

=> profile

1) get profile by userId

@route :  /profile/:userId
@params :  userId
@method : GET


2) update profile 

@route :  /profile/:userId
@params : userId
@method : PUT
@headers : {
    Authorization : Bearer token
}
@body : {
    isBlocked:Boolean
    location: {
        lat:String,
        lng:String
    },
    addresses:[String],
    profilePic: String,
    phone:String,
    email:String,
    name:String,
    bio:String
}
        ** carefully handle required validation because it is PUT method



3) delete profile

@route : /profile/:userId
@params : userId
@method : DELETE
@headers : {
    Authorization : Bearer token
}



4) add and update cart 

@route  /profile/cart
@method:PATCH
@body:{
    "cart": {
        "totalPrice": 120.90,
        "totalQuantity": 2,
        "products": [
            {
                "product": "607314336090b108934846d6",
                "quantity": 10
            },
            {
                "product": "607314336090b108934846d6",
                "quantity": 10
            }
        ]
    }
}

@headers:{
    Authorization : Bearer token
}
---------------------------------------------------------------------


=> user

1) fetch all users

@route : /user 
@method : GET



2)  fetch all normal users products

@route :  /user/products
@method:GET



3)  fetch my orders

@route : /user/orders
@method : GET
@headers : {
    Authorization:Bearer token
}


4)  fetch current user payments

@route : /user/payment
@method : GET
@headers : {
    Authorization:Bearer token
}


---------------------------------------------------------------------


=> business user

1) fetch all business users

@route : /business
@method : GET


2)  fetch all business products

@route :  /business/products
@method:GET

2)  fetch all business orders

@route :  /business/orders
@method:GET
@headers {
    Authentication:Bearer token

}


---------------------------------------------------------------------



=> category 

1)   fetch all categories

@route : /category
@method:GET


2) create new category

@route : /category
@method:POST
@body : {

    name : string
   
}
@headers : {
    Authorization : Bearer token
}

--> admin authorized (only admin can create)


3)  update category

@route : /category/:categoryId
@method:PUT
@params:{
    categoryId
}
@body : {
    name : string
   
}
@headers : {
    Authorization : Bearer token
}

--> admin authorized (only admin can update)

4) delete category

@route : /category/:categoryId
@method:DELETE
@params:{
    categoryId
}
@headers : {
    Authorization : Bearer token
}

--> admin authorized (only admin can delete)



5) fetch category by id

@route : /category/:categoryId
@method:GET
@params : {
    categoryId:string
}





=> product

1)  fetch product by id 

@route : /product/:productId
@method:GET
@params : {
    productId:string
}


2) create new product

@route : /product
@method:POST
@body : {
    name : string
    description : string
    price : number
    category:String
    image:string
    expiration:Date
    quantity:Number
   
}
@headers : {
    Authorization : Bearer token
}

 
** date should be ISO date

3) update  product

@route : /product/:productId
@method:PUT
@params:{
    productId
}
@body : {
    name : string
    description : string
    price : number
    category:String
    image:string
    expiration:Date
    quantity:Number
  
}
@headers : {
    Authorization : Bearer token
}






4) delete  product

@route : /product/:productId
@method:DELETE
@params:{
    productId
}
@headers : {
    Authorization : Bearer token
}



5)  fetch all products 

@route : /product
@method:GET

you can filter

@route : /product/?category=categoryName
@method : GET
@query {
    category:string
}


6)  fetch current user products

@route : /product/my_products
@method :  GET
@headers:{
    Authentication:Bearer token
}



-----------------------------------------------------

=> orders


1) get all orders

@route : /order
@method: GET


2) get order by orderId

@route : /order/:orderId
@params:{
    orderId
}
@method: GET



3) place new order

@route : /order
@method : POST
@headers : {
    Authorization : Bearer token
}
@body : {

     products: [
      {
        product:productId,
        quantity: Number,
        owner:User Id
      },
    ],
    totalQuantity: Number,
    totalPrice: Number,
    status: string 
    
  },

possible value of status : ["created", "deliver", "cancel","packing"],


4) update order

@route : /order/:orderId
@method : PUT
@params : orderId
@headers : {
    Authorization : Bearer token
}
@body : {

     orderBy:userId,
      orderTo:userId 

     products: [
      {
        product:productId,
        quantity: Number,
      },
    ],

    totalQuantity: Number,
    totalPrice: Number,

    status: {
      type: String,
      enum: ["created", "deliver", "cancel","packing"],
      default: "created",
    },
  },

}



5) delete order

@route : /order/:orderId
@params : orderId
@method : DELETE
@headers : {
    Authorization : Bearer token
}




6) get order for specific userId

@route : /order/orders_for_me/:userId
@params:{
    userId
}
@method: GET


7)  get orders by  specific userId


@route : /order/orders_by_me/:userId
@params:{
    userId
}
@method: GET


--------- payments --------------

1) create payment

@route : /payment
@body : {
    orderId, 
    razorpayOrderId,
     razorpayPaymentId,
      razorpaySignature
}
@method : POST
@headers {
    Authentication: Bearer token
}


2) fetch all payments

@route : /payment
@method : GET


3)  fetch payment by paymentId 

@route : /payment/:paymentId
@params : {
    paymentId
}
@method: GET



------------ Chat -----------


@route : /chat/:senderId/:receiverId
@params {
    senderId:user id of sender,
    receiverId:user id of receiver
}
@method:GET


==============================================


==============================================


SOCKET.io setup

=>  The client can send credentials with the auth option:

 const socket = io("http://localhost:5000",{
      extraHeaders:{
        Authorization:"Bearer "
      }
    });

=>  New message


@event : "message"
@data : {
    receiverId: user id of receiver 
    body : message
}
-> i will get sender userid from auth token

