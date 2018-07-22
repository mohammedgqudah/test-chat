import { EventEmitter } from 'events';

class AppEmitterClass extends EventEmitter {
    constructor () {
        super();
    }
}
let AppEmitter = new AppEmitterClass();
export default AppEmitter;


