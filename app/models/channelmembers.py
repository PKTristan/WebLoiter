from .db import db, enviroment, SCHEMA


class ChannelMembers(db.Model):
    __tablename__ = 'channelmembers'

    if enviroment == "production":
        __table_args__ = {'schema': SCHEMA}

    member_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'), primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.channels.id'), primary_key=True)

    users = db.relationship('User', back_populates='servermembers')
    channel = db.relationship('Channel', back_populates='members')