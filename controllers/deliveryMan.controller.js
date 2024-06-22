const Errors = require("../error/error");

class DeliveryManController {
    deliveryManRepository;
    authRepository;
    

    constructor(_deliveryManRepository,_authRepository  ) {
        this.deliveryManRepository = _deliveryManRepository;
        this.authRepository=_authRepository;
    }


    async getAllDeliveryMen(){
        return await this.deliveryManRepository.getAllDeliveryMen()
    }
    async getDeliveryMan(_id){
        return await this.deliveryManRepository.getDeliveryMan({_id})

    }
    async createDeliveryMan({userId}){
        if(!userId){
            throw new Errors.ApiError("user id missing", 400);
        }
        const user = await this.authRepository.getUser({_id:userId})
        if(!user){
            throw new Errors.ApiError("user not found", 400);
        }
        await this.authRepository.updateUser({_id:userId}, {typeId:"66771774961cf332096ffcb9"}) 
        return await this.deliveryManRepository.createDeliveryMan({userId})
    }
    async updateDeliveryMan(_id,updatedinfo){
        const deliveryMan = await this.deliveryManRepository.getDeliveryMan({_id});
        if(!deliveryMan){
            throw new Errors.ApiError("deliveryMan not found", 400);
        }
        return await this.deliveryManRepository.updateDeliveryMan({_id},updatedinfo)
    }
    async deleteDeliveryMan(_id){
        const deliveryMan = await this.deliveryManRepository.getDeliveryMan({_id});
        if(!deliveryMan){
            throw new Errors.ApiError("deliveryMan not found", 400);
        }
        await this.authRepository.updateUser({_id:deliveryMan.userId._id}, {typeId:"663dfebba2ede177e6885e42"}) 
        return await this.deliveryManRepository.deleteDeliveryMan({_id})
    }

}

module.exports = DeliveryManController