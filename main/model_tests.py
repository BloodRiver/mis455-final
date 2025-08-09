from django.test import TestCase
from main import models
from datetime import datetime as dt
from django.db.models import Q, QuerySet

# Create your tests here.


class ModelTests(TestCase):
    def setUp(self):
        
        new_user = models.User.objects.create(
            email="test@email.com",
            username="username"
        )
        
        new_course = models.Course.objects.create(
            course_code="CSC101",
            course_title="Intro to Programming",
            course_type="FOU",
        )
        
        new_course_section = models.CourseSection.objects.create(
            course=new_course,
            section_number=1,
            instructor=new_user,
            time_start=dt.now().time(),
            time_end=dt.now().time()
        )
        
    def test_course_creation(self):
        search_course = models.Course.objects.get(course_code="CSC101")
        
        self.assertEqual(search_course.course_title, "Intro to Programming")
        
    def test_course_table_display(self):
        all_course_sections = models.CourseSection.objects.all().order_by("course__course_code")
        
        for each_course_section in all_course_sections:
            enrolled_course = None
            try:
                enrolled_course = models.EnrolledCourse.objects.get(course_section=each_course_section)
            except models.EnrolledCourse.DoesNotExist:
                pass
            
            data = [
                each_course_section.course.course_code,
                each_course_section.course.course_title,
                str(each_course_section.section_number),
                each_course_section.time_start.strftime("%I:%M %p"),
                each_course_section.time_end.strftime("%I:%M %p")
            ]
            
            if enrolled_course is not None:
                data.append(enrolled_course.grade)
            
            max_length = str(len(max(data, key=len)) + 5)
            
            print(("{:^" + max_length + "}|{:^" + max_length + "}|{:^" + max_length + "}|{:^" + max_length + "}|{:^" + max_length + "}").format(*data))
