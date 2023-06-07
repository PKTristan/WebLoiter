from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Server



class ServerForm(FlaskForm):
    server_name = StringField('server_name', validators=[DataRequired()])
    server_type = SelectField('server_type', choices=[
        ('gaming', 'Gaming'),
        ('sports', 'Sports'),
        ('anime', 'Anime'),
        ('art', 'Art'),
        ('studying', 'Studying'),
        ('misc', 'Miscellaneous')], validators=[DataRequired()])
    avatar = StringField('avatar')
    server_details = TextAreaField('server_details')
    private = BooleanField('private')
    direct_message = BooleanField('direct_message')