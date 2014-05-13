var AppDispatcher = require('../dispatcher/AppDispatcher');
var StudentConstants = require('../constants/StudentConstants');

var StudentActions = {
    create: function(student) {
        AppDispatcher.handleViewAction({
            actionType: StudentConstants.STUDENT_CREATE,
            student: student
        });
    }
}

module.exports = StudentActions;