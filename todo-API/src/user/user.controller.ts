import { injectable } from "inversify";

@injectable()
export class UserController {
    constructor() { }

    public getUser() {
        return {
            firstName: "John",
            lastName: "Doe",
            email: "John@doe.com",
        };
    }
}