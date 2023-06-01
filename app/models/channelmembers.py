from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChannelMembers(db.Model):
    __tablename__ = 'channelmembers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), name='fk_channelmembers_member_id_users', ondelete='CASCADE'))
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id'), name='fk_channelmembers_channel_id_channels', ondelete='CASCADE'))

    user = db.relationship('User', back_populates='c_memberships')
    channel = db.relationship('Channel', back_populates='members')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'channel_id': self.channel_id
        }
