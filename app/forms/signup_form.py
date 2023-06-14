from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
def validate_url_format(url='https://i.imgur.com/YnEnRlg.jpg') -> bool:
    url_pattern = re.compile(r'^https?://[\w\-]+(\.[\w\-]+){1,2}\.[\w\-]{2,3}[/#?]?.*$')
    return bool(url_pattern.match(url))


class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    display_name = StringField('display_name', validators=[DataRequired()])
    profile_pic = StringField('profile_pic')
    bio = StringField('bio')
    password = StringField('password', validators=[DataRequired()])

    def validate_profile_pic(self, field):
        if field.data and not validate_url_format(field.data):
            raise ValidationError('Invalid URL format for avatar, example: https://i.imgur.com/YnEnRlg.jpg')
        elif not field.data: 
            raise ValidationError('please enter url')
        

