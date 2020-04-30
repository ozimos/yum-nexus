import { exec } from 'child_process';
import { debuglog } from 'util';

const log = debuglog('app');
export default function migrate(query){

    exec(query, (err, stdout) => {
        if (err) {
            log(`exec error: ${err}`);
            return;
        }
        log(stdout);
    });
}
