from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

class Channel(db.Model, UserMixin):
    __tablename__ = 'channels'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    channel_name = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.integer, db.ForeignKey('servers.id'))

    server = db.relationship('Server', backref=db.backref('channels', lazy=True))

