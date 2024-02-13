export class User {
    firstName: string;
    lastName: string;
    token: string;

    constructor(firstName: string, lastName: string, token: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }
}