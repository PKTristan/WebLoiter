from .db import db, enviroment, SCHEMA


class ChannelMembers(db.Model):
    __tablename__ = 'channelmembers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'))
    channel_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.channels.id'))

    users = db.relationship('User', back_populates='servermembers')
    channel = db.relationship('Channel', back_populates='members')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'channel_id': self.channel_id
        }
