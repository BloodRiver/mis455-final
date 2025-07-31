from django.urls import path
from . import views

app_name = "portal"

urlpatterns = [
    path("", views.redirect_view, name="home"),
    path("login", views.LoginView.as_view(), name="login"),
    path("dashboard", views.DashboardView.as_view(), name="dashboard"),
    path("course-registration-and-add-drop", views.CourseRegistrationAddDropView.as_view(), name="registration_add_drop"),
    path("registration-bill", views.RegistrationBillView.as_view(), name="registration_bill"),
    path("course-withdrawal", views.CourseWithdrawalView.as_view(), name="course_withdrawal"),
    path("submit-application", views.SubmitApplicationView.as_view(), name="submit_application"),
    path("new-application", views.NewApplicationView.as_view(), name="new_application"),
    path("profile", views.ProfileView.as_view(), name="profile"),
    path("logout", views.logout_view, name="logout"),
    path("faculty-evaluation", views.FacultyEvaluationView.as_view(), name="faculty_evaluation"),
    path("student-admission", views.StudentAdmissionView.as_view(), name="admission")
]
