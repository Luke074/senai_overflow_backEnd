const Student = require("../Models/Student");
const students = require("../validator/students");

module.exports = {
  async store(req, res){

    const {firebaseUrl} = req.file;
    const {studentId} = req;
    
    if(!firebaseUrl)
      return res.status(400).send({error: "Campo imagem é obrigatório"})
    else if(!studentId)
      return res.status(400).send({error: "Aluno não encotrado"})
      

    try {
      
      const student = await Student.findByPk(studentId);

      student.image = firebaseUrl;

      student.save();

      res.status(200).send({
        student: student.id,
        image: firebaseUrl,
      });

    } catch (error) {
      res.status(500).send({error});
    }
  },
}