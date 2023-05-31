from .db import db, environment, SCHEMA


class ChannelMembers(db.Model):
    __tablename__ = 'channelmembers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))

    user = db.relationship('User', backref='channelmembers')
    channel = db.relationship('Channel', backref='channelmembers')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'channel_id': self.channel_id
        }
