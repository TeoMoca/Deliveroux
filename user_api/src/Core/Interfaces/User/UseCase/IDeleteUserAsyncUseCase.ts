export interface IDeleteUserAsyncUseCase {
    execute(userId:string): Promise<Boolean>;
}