export class User {
    firstName: string;
    lastName: string;
    token: string;
    roles: string[];

    constructor(firstName: string, lastName: string, token: string, roles: string[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
        this.roles = roles;
    }
}