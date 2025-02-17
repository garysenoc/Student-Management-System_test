const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");


// Helper function for consistent response formatting
const sendJsonResponse = (res, data) => {
    res.json(data);
};

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    const { name, class: className, section, roll } = req.query;

    try {
      const students = await getAllStudents({ name, className, section, roll });
      sendJsonResponse(res, { students });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students", error });
    }
});

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    const { name, class: className, section, roll } = req.body;

    try {
      const newStudent = await addNewStudent({ name, class: className, section, roll });
      sendJsonResponse(res, newStudent);
    } catch (error) {
      res.status(500).json({ message: "Failed to add student", error });
    }
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const payload = { ...req.body, userId: parseInt(id, 10) };

  try {
    const updatedStudent = await updateStudent(payload);
    sendJsonResponse(res, updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update student", error });
  }

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    try {
      const student = await getStudentDetail(parseInt(id, 10));
      sendJsonResponse(res, student);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student details", error });
    }
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    const { id, reviewerId } = req.params;
    const { status } = req.body;
  
    try {
      const student = await setStudentStatus({
        userId: parseInt(id, 10),
        reviewerId,
        status,
      });
      sendJsonResponse(res, student);
    } catch (error) {
      res.status(500).json({ message: "Failed to update student status", error });
    }
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
