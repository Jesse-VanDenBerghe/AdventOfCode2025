export class Logger {

    constructor(public isEnabled: boolean) { }

    log(message: string) {
        if (!this.isEnabled) return;
        console.log(message);
    }

}