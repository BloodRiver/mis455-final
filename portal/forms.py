from django import forms
from django.contrib.auth import authenticate
from main import models
from multiselectfield import MultiSelectFormField


class LoginForm(forms.ModelForm):
    class Meta:
        fields = ("username", "password")
        model = models.User
        
        widgets = {
            "username": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "Enter your username"
                }
            ),
            "password": forms.PasswordInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "Enter your password"
                }
            )
        }
        
    def authenticate_user(self):
        return authenticate(
            username=self.cleaned_data["username"],
            password=self.cleaned_data["password"]
        )
        

class StudentAdmissionForm(forms.Form):
    photo = forms.ImageField(required=True)
    
    first_name = forms.CharField(max_length=150, required=True)
    last_name = forms.CharField(max_length=150, required=True)
    
    blood_group = forms.CharField(max_length=6, required=True)
    
    special_conditions = forms.CharField(max_length=100, required=False)
    
    email = forms.EmailField(required=True)
    phone_number = forms.CharField(required=True)
    present_address = forms.CharField(max_length=300, required=True)
    same_as_present_address = forms.BooleanField(required=False)
    permanent_address = forms.CharField(max_length=300, required=False)
    
    father_full_name = forms.CharField(max_length=300, required=True)
    father_phone_number = forms.CharField(max_length=20, required=True)
    father_email = forms.EmailField(required=True)
    father_profession = forms.CharField(max_length=200, required=True)
    
    mother_full_name = forms.CharField(max_length=300, required=True)
    mother_phone_number = forms.CharField(max_length=300, required=True)
    mother_email = forms.EmailField(required=True)
    mother_profession = forms.CharField(max_length=200, required=True)
    
    emergency_contact_1_name = forms.CharField(max_length=300, required=True)
    emergency_contact_1_relation = forms.CharField(max_length=100, required=True)
    emergency_contact_1_phone = forms.CharField(max_length=20, required=True)
    
    emergency_contact_2_name = forms.CharField(max_length=300, required=False)
    emergency_contact_2_relation = forms.CharField(max_length=100, required=False)
    emergency_contact_2_phone = forms.CharField(max_length=20, required=False)
    
    emergency_contact_3_name = forms.CharField(max_length=300, required=False)
    emergency_contact_3_relation = forms.CharField(max_length=100, required=False)
    emergency_contact_3_phone = forms.CharField(max_length=20, required=False)
    
    total_annual_family_income = forms.FloatField(required=False)
    
    financial_guarantor_name = forms.CharField(max_length=300, required=True)
    financial_guarantor_phone_number = forms.CharField(max_length=20, required=True)
    financial_guarantor_email = forms.EmailField(required=True)
    financial_guarantor_relation = forms.CharField(max_length=100)
    financial_guarantor_approx_yearly_income = forms.FloatField(required=True)
    
    olevel_ssc_certificate = forms.FileField(required=True)
    alevel_ssc_certificate = forms.FileField(required=True)
