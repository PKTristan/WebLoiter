from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Server
import re



class ServerForm(FlaskForm):
    server_name = StringField('server_name', validators=[DataRequired()])
    server_type = SelectField('server_type', choices=[
        ('gaming', 'Gaming'),
        ('sports', 'Sports'),
        ('anime', 'Anime'),
        ('art', 'Art'),
        ('studying', 'Studying'),
        ('direct message', 'Direct Message'),
        ('misc', 'Miscellaneous')], validators=[DataRequired()])
    avatar = StringField('avatar')
    server_details = TextAreaField('server_details')
    private = BooleanField('private')
    direct_message = BooleanField('direct_message')
    
    def validate_avatar(self, field):
        if field.data and not validate_url_format(field.data):
            raise ValidationError('Invalid URL format for avatar, example: https://i.imgur.com/YnEnRlg.jpg')
        elif not field.data: 
            raise ValidationError('please enter url')
        

def validate_url_format(url='https://i.imgur.com/YnEnRlg.jpg') -> bool:
    url_pattern = re.compile(r'^https?://[\w\-]+(\.[\w\-]+){1,2}\.[\w\-]{2,3}[/#?]?.*$')
    return bool(url_pattern.match(url))