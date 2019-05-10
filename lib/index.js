const selenium = require('selenium-standalone');
const debug = require('debug')('codeceptjs-selenium');
const error = require('debug')('codeceptjs-selenium:error');

module.exports = {
    bootstrap: done => {
        selenium.start((err, child) => {
            debug('bootstrap: selenium standalone server');
            if (err) {
                error('bootstrap: selenium standalone server', err);
                throw err;
            }
            selenium.__child = child;
            done();
        });
    },

    teardown: done => {
        setTimeout(() => {
            debug('teardown: selenium standalone server');
            try {
                if (selenium.__child) selenium.__child.kill();
            } catch (err) {
                error('teardown: ', err);
            }
        }, 3000);

        done();
    }
};
