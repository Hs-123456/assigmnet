exports.queryCreateEmploye = function (data) {
  const insertJson = {
    text: "INSERT INTO employee(first_name,last_name,location,join_date) VALUES($1,$2,$3,$4)",
    values: [data.first_name, data.last_name, data.location,data.join_date],
  };

  return insertJson;
};

exports.queryAddEmployeeComputerDepartment = function (data) {
  const insertJson = {
    text: "INSERT INTO computer_department(employee_id,phone,email) VALUES($1,$2,$3)",
    values: [data.employee_id, data.phone, data.email],
  };

  return insertJson;
};

exports.updateCountDepartment = function (data) {
  return `UPDATE employee SET count_department = ${data.count_department} WHERE employee_id = ${data.id}`;
};

exports.searchEmployeeDetails = function (start_date, end_date) {
  return `SELECT * FROM employee  WHERE
    created_at BETWEEN 
    '${start_date}' AND '${end_date}'`;
};
exports.findByid = function (id) {
  return `select * from employee where employee_id = ${id}`;
};
