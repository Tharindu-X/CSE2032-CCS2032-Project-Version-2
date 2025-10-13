import Student from "../models/studentModel.js";
import StudentRepository from "../repositories/studentRepository.js";
import HttpStatus from "../enums/httpStatus.js";

const student = new Student(null, null, null, null, null, null, null, null, null, null, null);

const getStudent = async (req, res) => {
  const email = req.params.email;
  student.email = email;
  
  // Validate email if wanted...
  /*
  const validateErrMsg = student.validateEmail(email);
  if (validateErrMsg)
    return res.status(HttpStatus.BAD_REQUEST).send(validateErrMsg);
 
*/

try {
    const result = await StudentRepository.findByEmail(email);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Student not found" });
    } 
    return res.status(HttpStatus.OK).json({ data: result });
    
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error ocurred" });
  }
};

export default {
  getStudent,
};
