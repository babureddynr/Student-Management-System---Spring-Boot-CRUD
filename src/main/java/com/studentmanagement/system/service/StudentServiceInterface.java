package com.studentmanagement.system.service;

import com.studentmanagement.system.model.Student;
import java.util.List;
import java.util.Optional;

public interface StudentServiceInterface {

    List<Student> getAllStudents();
    Optional<Student> getStudentById(Long id);
    Student saveStudent(Student student);
    void deleteStudent(Long id);
}