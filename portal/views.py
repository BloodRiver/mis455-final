from django.shortcuts import render, redirect
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import logout
from portal import forms
from main import models


def redirect_view(request):
    return redirect("portal:dashboard")


class LoginView(generic.View):
    template_name = "portal/login.html"
    form_class = forms.LoginForm
    
    def get(self, request):
        context = {
            "form": self.form_class(None)
        }
        return render(request, self.template_name, context)
    
    
# class DashboardView(LoginRequiredMixin, generic.View):
class DashboardView(generic.ListView):
    template_name = "portal/dashboard/home.html"
    login_url = "/portal/login"
    queryset = models.CourseSection.objects.all()
    context_object_name = "all_course_sections"
    

# class CourseRegistrationAddDropView(LoginRequiredMixin, generic.View):
class CourseRegistrationAddDropView(generic.View):
    template_name = "portal/dashboard/registration_add_drop.html"
    login_url = "portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
# class RegistrationBillView(LoginRequiredMixin, generic.View):
class RegistrationBillView(generic.View):
    template_name = "portal/dashboard/registration_bill.html"
    login_url = "/portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    

# class CourseWithdrawalView(LoginRequiredMixin, generic.View):
class CourseWithdrawalView(generic.View):
    template_name = "portal/dashboard/course_withdrawal.html"
    login_url = "/portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    

# class SubmitApplicationView(LoginRequiredMixin, generic.View):
class SubmitApplicationView(generic.View):
    template_name = "portal/dashboard/submit_application.html"
    login_url = "/portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    

# class NewApplicationView(LoginRequiredMixin, generic.View):
class NewApplicationView(generic.View):
    template_name = "portal/dashboard/new_application.html"
    login_url = "/portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    

# class ProfileView(LoginRequiredMixin, generic.View):
class ProfileView(generic.View):
    template_name = "portal/dashboard/profile_management.html"
    login_url = "/portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
def logout_view(request):
    logout(request)
    return redirect("portal:login")


# class FacultyEvaluationView(LoginRequiredMixin, generic.View):
class FacultyEvaluationView(generic.View):
    template_name = "portal/dashboard/faculty_evaluation.html"
    login_url = "/portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class StudentAdmissionView(generic.View):
    template_name = "portal/dashboard/student_admission.html"
    
    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        form = forms.StudentAdmissionForm(data=request.POST, files=request.FILES)
        
        if form.is_valid():
            print("Form is valid")
        else:
            print(form.errors.as_json())
            print("-" * 80)
            print(sorted(form.cleaned_data.items(), key=lambda x: x[0]))
        
        return redirect("portal:admission")
