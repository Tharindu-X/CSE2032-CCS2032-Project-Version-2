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
  constructor( email, f_name, l_name, year, password, dgree, dep_name, reg_no, linkedin_url, CV, id = null) {
    this.email = email;
    this.f_name = f_name;
    this.l_name = l_name;
    this.year = year;
    this.password = password;
    this.dgree = dgree; 
    this.dep_name = dep_name;
    this.reg_no = reg_no;
    this.linkedin_url = linkedin_url;
    this.id = id;
    this.CV = CV;
  };

}

export default Student;
