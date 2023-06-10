from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Message

class NewMessageForm(FlaskForm):
    message = StringField('message', validators=[DataRequired()])
    user_id = IntegerField('user_id')
    channel_id = IntegerField('channel_id')