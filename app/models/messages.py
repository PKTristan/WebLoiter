from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), name='fk_messages_user_id_users', ondelete='CASCADE'))
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id'), name='fk_messages_channel_id_channels', ondelete='CASCADE'))

    user = db.relationship('User', backref=db.backref('messages', lazy=True))
    channel = db.relationship('Channel', backref=db.backref('messages', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'user_id': self.user_id,
            'channel_id': self.channel_id
        }
