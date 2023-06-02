from app.models import db, ChannelMembers, environment, SCHEMA
from sqlalchemy.sql import text


def seed_channel_members():
    demo = ChannelMembers(
        member_id = 1,
        channel_id = 1
    )
    demo2 = ChannelMembers(
        member_id = 1,
        channel_id = 3
    )
    demo3 = ChannelMembers(
        member_id = 1,
        channel_id = 5
    )
    demo4 = ChannelMembers(
        member_id = 1,
        channel_id = 6
    )
    marnie = ChannelMembers(
        member_id = 2,
        channel_id = 1
    )
    marnie2 = ChannelMembers(
        member_id = 2,
        channel_id = 2
    )
    marnie3 = ChannelMembers(
        member_id = 2,
        channel_id = 4
    )
    bobbie = ChannelMembers(
        member_id = 3,
        channel_id = 1
    )
    bobbie2 = ChannelMembers(
        member_id = 3,
        channel_id = 3
    )
    bobbie3 = ChannelMembers(
        member_id = 3,
        channel_id = 4
    )
    alice = ChannelMembers(
        member_id = 4,
        channel_id = 1
    )
    alice2 = ChannelMembers(
        member_id = 4,
        channel_id = 5
    )
    alice3 = ChannelMembers(
        member_id = 4,
        channel_id = 6
    )
    bob = ChannelMembers(
        member_id = 5,
        channel_id = 1
    )
    bob2 = ChannelMembers(
        member_id = 5,
        channel_id = 2
    )
    bob3 = ChannelMembers(
        member_id = 5,
        channel_id = 4
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(marnie)
    db.session.add(marnie2)
    db.session.add(marnie3)
    db.session.add(bobbie)
    db.session.add(bobbie2)
    db.session.add(bobbie3)
    db.session.add(alice)
    db.session.add(alice2)
    db.session.add(alice3)
    db.session.add(bob)
    db.session.add(bob2)
    db.session.add(bob3)
    db.session.commit()



def undo_channel_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.Channelmembers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Channelmembers"))

    db.session.commit() 