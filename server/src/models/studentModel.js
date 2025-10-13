export const StudentModel = {
  table: 'student',
  columns: [
    'f_name',
    'l_name',
    'year',
    'email',
    'password',
    'dgree',
    'dep_name',
    'reg_no',
    'linkedin_url',
    'CV'
  ]
};


class Student {
  constructor( email, f_name, l_name, year, password, balance=0, id = null) {
    this.email = email;
    this.f_name = f_name;
    this.l_name = l_name;
    this.year = year;
    this.password = password;
    this.balance = balance;
    this.isAdmin = isAdmin;
  };

  }

export default User;
