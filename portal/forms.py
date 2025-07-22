from django import forms
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth import authenticate


class LoginForm(forms.ModelForm):
    class Meta:
        fields = ("username", "password")
        model = AuthUser
        
    def authenticate_user(self):
        return authenticate(
            username=self.cleaned_data["username"],
            password=self.cleaned_data["password"]
        )