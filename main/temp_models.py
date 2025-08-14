from django.db import models
from django.core.validators import MinValueValidator
from main.models import User

class Course(models.Model):
    course_code = models.CharField(max_length=8)
    course_title = models.CharField(max_length=300)
    pre_requisite = models.ManyToManyField("self", related_name="successor_courses")
    
    def __str__(self):
        return f"{self.course_code} - {self.course_title}"
    
    
class CourseSection(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    section_number = models.IntegerField(validators=[MinValueValidator])
    instructor = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    time_start = models.TimeField()
    time_end = models.TimeField()
    
    def __str__(self):
        return f"{self.course} - {self.section_number}"
    

class EnrolledCourse(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course_section = models.ForeignKey(CourseSection, on_delete=models.CASCADE)
    num_classes_taken = models.IntegerField(default=0, validators=[MinValueValidator])
    num_classes_attended = models.IntegerField(default=0, validators=[MinValueValidator])
    
    def __str__(self):
        return f"{self.student} - {self.course_section}"
