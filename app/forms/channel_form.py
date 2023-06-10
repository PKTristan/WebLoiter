from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CreateChannelForm(FlaskForm):
    server_id = IntegerField('server_id', validators=[DataRequired()])
    channel_name = StringField('channel_name', validators=[DataRequired()])
