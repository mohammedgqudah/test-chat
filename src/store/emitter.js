import { EventEmitter } from 'events';

class AppEmitterClass extends EventEmitter {
    constructor () {
        super();
        this.on('active_card'),
    }
}
let AppEmitter = new AppEmitterClass;
export default AppEmitter;


