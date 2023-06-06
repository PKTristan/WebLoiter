from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Server



class ServerForm(FlaskForm):
    server_name = StringField('Server Name', validators=[DataRequired()])
    server_type = SelectField('Server Type', choices=[
        ('gaming', 'Gaming'),
        ('sports', 'Sports'),
        ('anime', 'Anime'),
        ('art', 'Art'),
        ('studying', 'Studying'),
        ('misc', 'Miscellaneous')], validators=[DataRequired()])
    avatar = StringField('Avatar')
    server_details = TextAreaField('Server Details')
    private = BooleanField('Private')
    direct_message = BooleanField('DM')