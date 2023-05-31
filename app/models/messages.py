from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.integer, db.ForeignKey('users.id'))
    channel_id = db.Column(db.integer, db.ForeignKey('channels.id'))

    user = db.relationship('User', backref=db.backref('messages', lazy=True))
    channel = db.relationship('Channel', backref=db.backref('messages', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'user_id': self.user_id,
            'channel_id': self.channel_id
        }
