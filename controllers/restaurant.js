class RestaurantController{
    constructor(restaurantService){
this.restaurantService=restaurantService
    }
    getRestaurants(){
        return this.restaurantService.getCartItems()
    }
}

module.exports=RestaurantController