from django.test import TestCase
from portal import forms
# Create your tests here.


class StudentAdmissionFormTest(TestCase):
    form: forms.StudentAdmissionForm
    
    def setUp(self):
        self.form = forms.StudentAdmissionForm(None)
        
    def test_form_validation(self):
        self.form = forms.StudentAdmissionForm(data={'csrfmiddlewaretoken': ['BV8IiiACr6SjZ4u7415qX8zD3tkcipdaUcnkY2B6ydEuEFrVU645pd9CxLPx0tZF'], 'first_name': ['waefwe'], 'last_name': ['awfe'], 'blood_group': ['A-'], 'email': ['awef@gmail.com'], 'phone_number': ['1231'], 'present_address': ['awfaw'], 'same_as_present': ['on'], 'permanent_address': [''], 'father_full_name': ['awfew'], 'father_phone_number': ['12312'], 'father_email': ['awef@gmail.com'], 'father_profession': ['afawe'], 'mother_full_name': ['aweefw'], 'mother_phone': ['12312'], 'mother_email': ['awef@gmail.com'], 'emergency_phone_1': ['13123'], 'total_annual_family_income': ['1231'], 'financial_guarantor_name': ['awefw'], 'financial_guarantor_phone_number': ['awfew'], 'financial_guarantor_email': ['awfew@gmail.com'], 'financial_guarantor_relation': ['awefw'], 'financial_guarantor_approx_yearly_income': ['123']})
        
        if self.form.is_valid():
            print("Valid")
        else:
            print(self.form.errors.as_json())
            print("-" * 80)
            print(sorted(self.form.cleaned_data.items(), key=lambda x: x[0]))