
var EventEmitter = require('events').EventEmitter;

var request = require('superagent');
var merge = require('react/lib/merge');

var StudentConstants = require('../constants/StudentConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT = 'change';


var _students = [];

function create(student) {
    var id = Date.now();
    student.id = id;
    _students.push(student);

}
function update(id, updates) {
    _students = merge(_students[id], updates);
}
function destroy(id) {
    delete _students[id];
}



var StudentStore = merge(EventEmitter.prototype, {
    getAll: function() {
        return _students;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});
// Register to handle all updates
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case StudentConstants.STUDENT_CREATE:
            create(action.student);
            break;

        default:
            return true;
    }
    StudentStore.emitChange();
    return true; // No errors.  Needed by promise in Dispatcher.
})

module.exports = StudentStore;