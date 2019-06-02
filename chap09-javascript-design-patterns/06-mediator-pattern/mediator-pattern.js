/**
 * Example of an implementation of the mediator pattern
 */
var mediator = {}

mediator.getEmployeeDetail = function (employeeId) {
  const employees = [
    {
      id: 1,
      name: 'Isaac',
      job: 'developer'
    },
    {
      id: 2,
      name: 'Nahum',
      job: 'tester'
    }
  ]

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      const employee = employees.find(({ id }) => id === employeeId)
      resolve(employee)
    }, 0)
  })
}

mediator.selectManager = function (employee) {
  var managers = {
    1: { name: 'Bob' },
    2: { name: 'John' }
  }

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(managers[employee.id])
    }, 0)
  })
}

// Original example uses event listeners,
// employeeDetail.on('complete', callback);
// for the sake of this example I used promises.
mediator.getEmployeesManager = function (employeeId) {
  // the mediator decides what to do when the details is complete.
  return this.getEmployeeDetail(employeeId).then((employee) => {
    if (!employee) return Promise.reject(new Error(`${employeeId} not found.`))

    var managerSelector = this.selectManager(employee)

    // now it handles another object,
    // here is where de mediator decides what to do between objects.
    return managerSelector.then((manager) => manager)
  })
}

module.exports = mediator
