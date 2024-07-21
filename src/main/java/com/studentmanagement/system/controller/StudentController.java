package com.studentmanagement.system.controller;

import com.studentmanagement.system.model.Student;
import com.studentmanagement.system.service.StudentServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/student-management/students")
public class StudentController {

    @Autowired
    private StudentServiceInterface studentService;

    
    @GetMapping("/index")
    public String getIndexPage() {
        return "index.html";
    }
    
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public String createStudent(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "Student inserted successfully";
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);
        return studentService.saveStudent(student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
}