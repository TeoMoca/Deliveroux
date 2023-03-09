export interface checkoutSession {
    id:string,
    url:string | null,
    commandsId:string[]
}

export class CheckoutSession implements CheckoutSession{
    constructor(
        public id:string,
        public url:string | null,
        public commandsId:string[]

    ){}
}