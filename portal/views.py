from django.shortcuts import render, redirect
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin
from . import forms


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
class DashboardView(generic.View):
    template_name = "portal/dashboard/home.html"
    login_url = "/portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
    

# class CourseRegistrationAddDropView(LoginRequiredMixin, generic.View):
class CourseRegistrationAddDropView(generic.View):
    template_name = "portal/dashboard/registration_add_drop.html"
    login_url = "portal/login"
    
    def get(self, request):
        return render(request, self.template_name)
