export interface IUpdateRestaurantIdUseCase{
    execute(userId:string, restaurantId:string): Promise<Boolean>;
}
