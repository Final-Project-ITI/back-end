const Errors = require("../error/error");

class DeliveryController {
    deliveryRepository;
    orderRepository;
    deliveryManRepository;
    

    constructor(_deliveryRepository,_deliveryManRepository,_orderRepository ) {
        this.deliveryRepository = _deliveryRepository;
        this.orderRepository=_orderRepository
        this.deliveryManRepository=_deliveryManRepository;
    }

    async createDelivery(orderId,deliveryInfo){
        const order= await this.orderRepository.getOrderById(orderId)
        if(!order){
            throw new Errors.ApiError("order not found", 400);
        }
        return this.deliveryRepository.createDelivery({orderId})
    }
    async getAllDeliveries(){
        return await this.deliveryRepository.getAllDeliveries()
    }
    async getDelivery(_id){
        return await this.deliveryRepository.getDelivery({_id})

    }
    async acceptDelivery(_id,deliveryManId,info){
        const delivery= await this.deliveryRepository.getDelivery({_id})
        if(!delivery){
            throw new Errors.ApiError("delivery not found", 400);
        }
        if(delivery.deliveryManId){
            throw new Errors.ApiError("already accepted", 400);
        }

        await this.deliveryManRepository.updateDeliveryMan({_id:deliveryManId},{currentlyDeliver:_id});        
        
        return await this.deliveryRepository.updateDelivery({_id},{assignedAt:Date.now()})
    }
    async updateDelivery(_id,deliveryManId,info){
        const delivery= await this.deliveryRepository.getDelivery({_id})
        if(!delivery){
            throw new Errors.ApiError("delivery not found", 400);
        }
        if(delivery.deliveryManId!==deliveryManId){
            throw new Errors.UnAuthError();
        }
        if(delivery.deliverdAt){
            throw new Errors.ApiError("already deliverd", 400);
        }
        await this.deliveryManRepository.updateDeliveryMan({_id:deliveryManId},{currentlyDeliver:null});
        
        return await this.deliveryRepository.updateDelivery({_id},{deliverdAt:Date.now()})
    }

    async getDeliverManDeliveries(deliveryManId){
        return await this.deliveryRepository.getDeliveries({deliveryManId})
    }

}

module.exports = DeliveryController