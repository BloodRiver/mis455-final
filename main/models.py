from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator


class User(AbstractUser):
    photo = models.ImageField(upload_to="user_photos")
    user_id = models.CharField(max_length=10, unique=True)
    
    BLOOD_GROUP_CHOICES = (
        ("A+", "A+"),
        ("A-", "A-"),
        ("B+", "B+"),
        ("B-", "B-"),
        ("AB+", "AB+"),
        ("AB-", "AB-"),
        ("O+", "O+"),
        ("O-", "O-")
    )
    
    blood_group = models.CharField(max_length=4, choices=BLOOD_GROUP_CHOICES)
    
    present_address = models.TextField()
    permanent_address = models.TextField()

    
    # emergency contact
    
    # financial guarantor
    
    # o,alevel certificate
    
    
class StudentGuardian(models.Model):
    student = models.ManyToManyField(User)
    full_name = models.CharField(max_length=300)
    relation = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    profession = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return f"Guardian - {self.full_name}"
    
    
class EmergencyContact(models.Model):
    student = models.ManyToManyField(User)
    full_name = models.CharField(max_length=300)
    relation = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    profession = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return f"Emergency Contact - {self.full_name}"
    

class FinancialGuarantor(models.Model):
    student = models.ManyToManyField(User)
    full_name = models.CharField(max_length=300)
    relation = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    profession = models.CharField(max_length=200, blank=True)
    approximate_yearly_income = models.FloatField(validators=[MinValueValidator(50000)])
    
    def __str__(self):
        return f"Financial Guarantor - {self.full_name}"


class Course(models.Model):
    course_code = models.CharField(max_length=8)
    course_title = models.CharField(max_length=300)
    pre_requisite = models.ManyToManyField("Course", related_name="successor_courses", blank=True)
    COURSE_TYPE_CHOICES = (
        ("MAJ", "Major"),
        ("MIN", "Minor"),
        ("COR", "Core"),
        ("OPT", "Optional"),
        ("FOU", "Foundation")
    )
    course_type = models.CharField(max_length=3, choices=COURSE_TYPE_CHOICES)
    
    def __str__(self):
        return f"{self.course_code} - {self.course_title}"
    
    
class CourseSection(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    section_number = models.IntegerField(validators=[MinValueValidator(1)])
    instructor = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    time_start = models.TimeField()
    time_end = models.TimeField()
    WEEKDAY_CHOICES = (
        ("ST", "Sunday & Tuesday"),
        ("MW", "Monday & Wednesday"),
        ("AR", "Thursday & Saturday")
    )
    # weekdays
    
    def __str__(self):
        return f"{self.course} - {self.section_number}"
    
    def get_course_timing_as_str(self):
        return f"Monday & Wednesday {self.time_start.strftime('%I:%M %p')} - {self.time_end.strftime('%I:%M %p')}"
    

class EnrolledCourse(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course_section = models.ForeignKey(CourseSection, on_delete=models.CASCADE)
    num_classes_taken = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    num_classes_attended = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    
    GRADE_CHOICES = (
        ("A", "A"),
        ("A-", "A-"),
        ("B+", "B+"),
        ("B", "B"),
        ("B-", "B-"),
        ("C+", "C+"),
        ("C", "C"),
        ("C-", "C-"),
        ("D+", "D+"),
        ("D", "D"),
        ("D-", "D-"),
        ("F", "F"),
        ("I", "I"),
        ("W", "W"),
        ("Z", "Z")
    )
    
    grade = models.CharField(max_length=3, choices=GRADE_CHOICES, default="Z")
    
    GRADE_POINTS = {
        "A": 4.0,
        "A-": 3.75,
        "B+": 3.5,
        "B": 3.25,
        "B-": 3.0,
        "C+": 2.75,
        "C": 2.5,
        "C-": 2.0,
        "D+": 1.75,
        "D": 1.5,
        "D-": 1.0
    }
    
    def __str__(self):
        return f"{self.student} - {self.course_section}"
